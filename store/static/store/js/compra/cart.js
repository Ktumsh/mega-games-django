document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart_details_area");
  const pageGameBg = document.getElementById("pageGameBg");

  function renderCart() {
    fetch("/api/cart/items/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((cart) => {
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
          cartContainer.innerHTML =
            '<div class="empty_cart">Tu carro está vacío.</div>';
          updateTotalToPay(0);
          updateCartCount();
          document.querySelectorAll(".topay_bottom").forEach((btn) => {
            btn.classList.add("disabled");
          });
          return;
        }

        const defaultHTML = `
            <div class="cart_topay_area mobile">
                <div class="topay_area_ctn">
                    <div class="topay_top">
                        <div>Total estimado</div>
                        <div class="totalToPay">CLP$0</div>
                    </div>
                    <div class="topay_middle">Los impuestos de venta se calcularán durante el pago (si es aplicable)</div>
                    <button class="cart_page_btn topay_bottom">Continuar con el pago</button>
                </div>
            </div>
            <div class="cart_bottom_area">
                <div>
                    <a class="cart_page_btn" href="/">Seguir comprando</a>
                </div>
                <div class="delete_article">Eliminar todos los artículos</div>
            </div>
            <div class="divider"></div>
        `;

        let total = 0;

        setFirstValidBackground(cart);

        cart.forEach((product, index) => {
          for (let i = 0; i < product.quantity; i++) {
            const priceNumber = Number(
              product.game.precio_descuento ||
                product.game.precio_original ||
                "0"
            );

            // Sumar el precio al total
            total += priceNumber;

            // Formatear el precio para mostrarlo
            const formattedPrice = priceNumber.toLocaleString("es-CL");

            let originalPriceHTML = "";
            if (product.game.descuento && product.game.precio_original) {
              const originalPriceNumber = Number(product.game.precio_original);
              const formattedOriginalPrice =
                originalPriceNumber.toLocaleString("es-CL");
              originalPriceHTML = `
                <div class="price_label">
                  <div class="original_price">CLP$${formattedOriginalPrice}</div>
                  <div class="final_price">CLP$${formattedPrice}</div>
                </div>
              `;
            } else {
              originalPriceHTML = `<div class="final_price">CLP$${formattedPrice}</div>`;
            }

            let discountHTML = "";
            if (product.game.descuento) {
              discountHTML = `<span id="discount" class="discount">${product.game.descuento}</span>`;
            }

            const productHTML = `
                <div id="gameCard-${index}-${i}" class="cart_top_area">
                    <div class="game_area_ctn">
                        <div class="top_area">
                            <div class="game_image">
                                <a href="">
                                    <img src="${
                                      product.game.imagen_alternativa ||
                                      product.game.imagen
                                    }" alt="${product.game.nombre}" />
                                </a>
                            </div>
                            <div class="game_info_ctn">
                                <div class="game_info game_title">
                                    <div class="title">${
                                      product.game.nombre
                                    }</div>
                                </div>
                                <div class="game_info game_platform">
                                <span id=platform class="platform_label">
                                ${product.game.disponible_en
                                  .map(
                                    (platform) =>
                                      `<span title="Disponible en ${platform}" class="platform_img ${platform}"></span>`
                                  )
                                  .join("")}
                              </span>
                                </div>
                                <div class="game_price">
                                    <span class="price">
                                        ${discountHTML}
                                        ${originalPriceHTML}
                                    </span>
                                </div>
                                <div class="game_info game_additional">
                                    <div class="add_delete">
                                        <div class="add" data-id="${
                                          product.game.id
                                        }" data-group="${
              product.group
            }" data-index="${index}" title="Añadir otra copia de este artículo a tu carro">
                                            Añadir
                                        </div>
                                        |
                                        <div class="delete" data-id="${
                                          product.game.id
                                        }" data-group="${
              product.group
            }" data-index="${index}-${i}">Eliminar</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `;
            cartContainer.innerHTML += productHTML;
          }
        });

        cartContainer.innerHTML += defaultHTML;

        updateTotalToPay(total);
        updateCartCount();
        attachEventListeners();
      })
      .catch((error) => console.error("Error al obtener el carrito:", error));
  }

  function updateTotalToPay(total) {
    const formattedTotal = total.toLocaleString("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    document.querySelectorAll(".totalToPay").forEach((element) => {
      element.textContent = `CLP$${formattedTotal}`;
    });
  }

  function setFirstValidBackground(cart) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].game.background) {
        setBackground(cart[i].game.background);
        break;
      }
    }
  }

  function setBackground(backgroundUrl) {
    pageGameBg.style.backgroundImage = `url(${backgroundUrl})`;
  }

  function updateTotalToPay(total) {
    document.querySelectorAll(".totalToPay").forEach((element) => {
      element.textContent = `CLP$${total.toLocaleString("es-CL", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    });
  }

  function updateCartCount() {
    fetch("/api/cart/count/")
      .then((response) => response.json())
      .then((data) => {
        const cartCountElement = document.querySelector(
          "#cart_status_data .cart_link"
        );
        if (cartCountElement) {
          cartCountElement.textContent = `Carro (${data.totalItems})`;
        }
      });
  }

  updateCartCount();

  function attachEventListeners() {
    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        removeFromCart(index);
      });
    });

    document.querySelectorAll(".add").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        const productGroup = e.target.dataset.group;
        addToCart(productId, productGroup);
      });
    });

    document.querySelector(".delete_article").addEventListener("click", () => {
      removeAllFromCart();
    });
  }

  function returnStock(productId, quantity) {
    fetch(`/api/cart/returnStock/${productId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ quantity: quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          console.error(data.message);
        } else {
          console.log(`Stock actualizado: ${data.stock}`);
        }
      })
      .catch((error) => console.error("Error al devolver el stock:", error));
  }

  function removeFromCart(index) {
    const productId = document.querySelector(`[data-index="${index}"]`).dataset
      .id;
    const quantity = 1;
    fetch(`/api/cart/remove/${productId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ index: index }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        returnStock(productId, quantity);
        updateCartCount();
        renderCart();
      })
      .catch((error) =>
        console.error("Error al eliminar el producto del carrito:", error)
      );
  }

  function removeAllFromCart() {
    fetch("/api/cart/clear/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        renderCart();
      })
      .catch((error) => console.error("Error al vaciar el carrito:", error));
  }

  function addToCart(productId, productGroup) {
    fetch(`/api/cart/add/${productId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ group: productGroup }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        renderCart();
        updateCartCount();
      })
      .catch((error) =>
        console.error("Error al añadir el producto al carrito:", error)
      );
  }

  renderCart();
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
