document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cart_page_btn").forEach((button) => {
    button.addEventListener("click", function () {
      const game = {
        id: this.dataset.id,
        nombre: this.dataset.nombre,
        imagen: this.dataset.imagen,
        precio_original: this.dataset.precioOriginal,
        precio_descuento: this.dataset.precioDescuento,
        descuento: this.dataset.descuento,
        disponible_en: this.dataset.disponibleEn.split(","),
      };
      addToCart(game);
      openModal(game);
    });
  });

  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", function () {
      const gameId = this.dataset.id;
      removeFromWishlist(gameId);
    });
  });

  const card = Array.from(document.querySelectorAll(".cart_top_area")).map(
    (card) => {
      return { game: { background: card.dataset.background } };
    }
  );
  setFirstValidBackground(card);
});

function addToCart(game) {
  fetch(`/api/cart/add/${game.id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

function removeFromWishlist(gameId) {
  fetch(`/remove-from-wishlist/${gameId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({ game_id: gameId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Juego eliminado de la wishlist") {
        document.getElementById(`gameCard-${gameId}`).remove();
        const remainingCards = document.querySelectorAll(".cart_top_area");
        const updatedCart = Array.from(remainingCards).map((card) => {
          return { game: { background: card.dataset.background } };
        });
        setFirstValidBackground(updatedCart);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function openModal(game) {
  const modalTemplate = document.getElementById("modal-template");
  const modal = modalTemplate.cloneNode(true);
  modal.id = "";
  modal.style.display = "block";

  modal.querySelector("#dialogGameImage").src = game.imagen;
  modal.querySelector("#dialogGameTitle").innerText = game.nombre;

  if (game.descuento) {
    modal.querySelector("#dialogDiscount").innerText = game.descuento;
    modal.querySelector("#dialogDiscount").style.display = "block";
  } else {
    modal.querySelector("#dialogDiscount").style.display = "none";
  }

  const originalPriceHTML = `<div class="original_price">${game.precio_original}</div>`;
  const finalPriceHTML =
    game.precio_descuento !== "None"
      ? `<div class="final_price">${game.precio_descuento}</div>`
      : `<div class="final_price">${game.precio_original}</div>`;

  modal.querySelector("#dialogPriceLabel").innerHTML =
    game.precio_descuento !== "None"
      ? originalPriceHTML + finalPriceHTML
      : finalPriceHTML;

  const platformLabel = modal.querySelector("#dialogPlatform");
  platformLabel.innerHTML = "";
  if (game.disponible_en && game.disponible_en.length > 0) {
    game.disponible_en.forEach((platform) => {
      const trimmedPlatform = platform.trim();
      if (trimmedPlatform) {
        const span = document.createElement("span");
        span.title = `Disponible en ${trimmedPlatform}`;
        span.classList.add("platform_img", trimmedPlatform);
        platformLabel.appendChild(span);
      }
    });
  }

  document.body.appendChild(modal);

  modal.querySelector(".close_button").addEventListener("click", () => {
    modal.remove();
    document.body.classList.remove("hidden_body");
  });

  modal.querySelector(".keep_shopping").addEventListener("click", () => {
    modal.remove();
    document.body.classList.remove("hidden_body");
  });

  document.body.classList.add("hidden_body");
}

function setFirstValidBackground(card) {
  for (let i = 0; i < card.length; i++) {
    if (card[i].game.background) {
      setBackground(card[i].game.background);
      break;
    }
  }
}

function setBackground(backgroundUrl) {
  const pageGameBg = document.getElementById("pageGameBg");
  pageGameBg.style.backgroundImage = `url(${backgroundUrl})`;
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
