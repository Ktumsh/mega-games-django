document.addEventListener("DOMContentLoaded", () => {
  const product = window.userContext.productDetails;

  if (product) {
    setupAddToCartButton(product);
  } else {
    console.error("No se encontraron detalles del producto.");
  }

  function setupAddToCartButton(product) {
    const addToCartButton = document.querySelector(".add_to_cart button");

    addToCartButton.addEventListener("click", () => {
      if (product.stock <= 0) {
        alert("Este producto está agotado");
        return;
      }

      const cartItem = {
        id: product.id,
        group: product.origen,
        name: product.nombre,
        discount: product.descuento || null,
        originalPrice: product.precio_original || null,
        price: product.precio_descuento || product.precio_original,
        img: product.imagen_alternativa || product.imagen,
        background: product.background,
        platform: product.disponibleEn,
        quantity: 1,
      };

      fetch(`/api/cart/add/${product.id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(cartItem),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            updateCartCount();
            reduceStock(product.id, cartItem.group, 1);
          }
        })
        .catch((error) =>
          console.error("Error al agregar el producto al carrito:", error)
        );
    });
  }

  function reduceStock(productId, productGroup, quantity) {
    fetch(`/api/games/reduceStock/${productId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ group: productGroup, quantity: quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        console.log(`Stock reducido: ${data.stock}`);
      })
      .catch((error) => console.error("Error al reducir el stock:", error));
  }

  function updateCartCount() {
    fetch("/api/cart/count/")
      .then((response) => response.json())
      .then((data) => {
        const cartCountElement = document.querySelector(
          "#cart_status_data .cart_link"
        );
        if (cartCountElement) {
          const svgElement = cartCountElement.querySelector("svg");

          if (svgElement) {
            if (
              svgElement.nextSibling &&
              svgElement.nextSibling.nodeType === Node.TEXT_NODE
            ) {
              svgElement.nextSibling.textContent = ` Carro (${data.totalItems})`;
            } else {
              const textNode = document.createTextNode(
                ` Carro (${data.totalItems})`
              );
              svgElement.parentNode.insertBefore(
                textNode,
                svgElement.nextSibling
              );
            }
          }
        }
      });
  }

  updateCartCount();
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
