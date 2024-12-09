let lastCard = 0;
let isLoading = false;
let cardData = [];
let currentSlideIndex = 0;
let backgroundIntervalId;

function updateCounter(total) {
  const counterElement = document.getElementById("counter");
  counterElement.textContent = total;
}

function getMaxCards() {
  const isTablet = window.innerWidth <= 1024 && window.innerWidth >= 768;
  return isTablet ? 9 : 8;
}

async function loadInitialCards() {
  try {
    const response = await fetch("/api/games/");
    const api_store = await response.json();
    const tarjetas = api_store;
    cardData = tarjetas;
    const cardsContainer = document.getElementById(
      "popularGamesCardsContainer"
    );

    updateCounter(cardData.length);

    const maxCards = getMaxCards();
    const cardsForLoad = cardData.slice(lastCard, lastCard + maxCards);

    renderCards(cardsForLoad, cardsContainer, lastCard);

    lastCard += cardsForLoad.length;

    window.addEventListener("scroll", loadCardsOnScroll);

    updateBackground();
    startBackgroundAutoChange();
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadInitialCards);

async function loadCardsOnScroll() {
  if (isLoading) {
    return;
  }

  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - window.innerHeight * 0.5;
  if (scrollPosition < threshold) {
    return;
  }

  isLoading = true;

  try {
    const response = await fetch("/api/games/");
    const api_store = await response.json();
    const tarjetas = api_store;
    cardData = tarjetas;
    const cardsContainer = document.getElementById(
      "popularGamesCardsContainer"
    );
    const loader = document.getElementById("loader");

    const maxCards = getMaxCards();
    const cardsForLoad = cardData.slice(lastCard, lastCard + maxCards);

    renderCards(cardsForLoad, cardsContainer, lastCard);

    lastCard += cardsForLoad.length;

    if (lastCard >= cardData.length) {
      loader.style.display = "none";
      window.removeEventListener("scroll", loadCardsOnScroll);
    }

    isLoading = false;
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
    const loader = document.getElementById("loader");
    loader.style.display = "none";
    isLoading = false;
  }
}

function renderCards(cardsForLoad, cardsContainer, startIndex) {
  cardsForLoad.forEach((tarjeta, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card_");
    const pageOrigin =
      tarjeta.origen === "editorSalePage"
        ? "publisher-sale-details"
        : tarjeta.origen === "offerCards"
        ? "offer-details"
        : tarjeta.origen === "gamesCards"
        ? "games-details"
        : "gift-details";
    const pageName = encodeURIComponent(tarjeta.nombre);
    const pageGroup = encodeURIComponent(tarjeta.origen);

    const hasDiscount = tarjeta.precio_descuento;

    const discountHTML = `
        <div class="fs-sm d-flex flex-row flex-lg-column gap-sm-2">
            <div class="d-flex align-items-center h-100">
                <span class="descuento_label p-1">${tarjeta.descuento}</span>
            </div>
            <div>
                <div class="d-inline-flex flex-row flex-sm-column flex-lg-row p-1 gap-1 bg-p1">
                <p class="descuento-precio mb-0 position-relative motiva-sans">CLP$ ${Number(
                  tarjeta.precio_original
                ).toLocaleString("es-CL")}</p>
                <p class="mb-0 fw-semibold text-p3 motiva-sans">CLP$ ${Number(
                  tarjeta.precio_descuento
                ).toLocaleString("es-CL")}</p>
                </div>
            </div>
        </div>
    `;

    const normalPriceHTML = `
        <div class="card_price">
            <span class="card_text">Desde</span>
            <span class="price">CLP$ ${Number(
              tarjeta.precio_original
            ).toLocaleString("es-CL")}</span>
        </div>
    `;

    const dlcSpan = tarjeta.dlc ? `<span class="dlc_span">DLC</span>` : "";
    const cardContent = `
      <div class="card_struct active ${hasDiscount ? "border-p3" : ""}">
        <div class="card_content">
          <div class="card_img">
            <div class="img_card_content">
              <picture>
                <img class="img_card" src="${tarjeta.imagen}" alt="${
      tarjeta.nombre
    }" loading="lazy">
              </picture>
            </div>
          </div>
          <div class="card_top_body">
            <div class="card_title">
              <span>${dlcSpan}${tarjeta.nombre}</span>
            </div>
          </div>
          <div class="card_bottom_body">
            <a class="card_link" href="/${pageOrigin}?game=${pageName}&group=${pageGroup}&item=${
      tarjeta.id
    }">
    ${hasDiscount ? discountHTML : normalPriceHTML}
              <div class="like_badge">
                <span class="like_span">
                  <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" class="like_icon" style="max-width: 16px; min-width: 16px; height: auto;">
                    <path d="M12,21.844l-9.588-10A5.672,5.672,0,0,1,1.349,5.293h0a5.673,5.673,0,0,1,9.085-1.474L12,5.384l1.566-1.565a5.673,5.673,0,0,1,9.085,1.474h0a5.673,5.673,0,0,1-1.062,6.548Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span class="like_count">${tarjeta.likes}</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    `;
    cardElement.innerHTML = cardContent;
    cardsContainer.appendChild(cardElement);

    cardElement.addEventListener("mouseover", () => {
      stopBackgroundAutoChange();
      updateBackground(startIndex + index);
    });

    cardElement.addEventListener("mouseout", () => {
      startBackgroundAutoChange();
    });
  });
}

function updateBackground(index = currentSlideIndex) {
  const pageGameBg = document.getElementById("pageGameBg");
  if (cardData.length > 0) {
    const imageUrl = cardData[index % cardData.length].background;
    preloadImage(imageUrl)
      .then(() => {
        pageGameBg.style.backgroundImage = `url(${imageUrl})`;
      })
      .catch((error) => {
        console.error("Error al cargar la imagen de fondo:", error);
      });
  }
}

function startBackgroundAutoChange() {
  if (backgroundIntervalId) {
    clearInterval(backgroundIntervalId);
  }
  backgroundIntervalId = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % cardData.length;
    updateBackground();
  }, 5000);
}

function stopBackgroundAutoChange() {
  if (backgroundIntervalId) {
    clearInterval(backgroundIntervalId);
    backgroundIntervalId = null;
  }
}

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = reject;
  });
}
