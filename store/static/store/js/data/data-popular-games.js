let lastCard = 0;
let isLoading = false;

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
    const tarjetas = api_store.filter((game) => game.origen === "gamesCards");
    const cardsContainer = document.getElementById(
      "popularGamesCardsContainer"
    );

    updateCounter(tarjetas.length);

    const maxCards = getMaxCards();
    const cardsForLoad = tarjetas.slice(lastCard, lastCard + maxCards);

    renderCards(cardsForLoad, cardsContainer);

    lastCard += cardsForLoad.length;

    window.addEventListener("scroll", loadCardsOnScroll);
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
    const tarjetas = api_store.filter((game) => game.origen === "gamesCards");
    const cardsContainer = document.getElementById(
      "popularGamesCardsContainer"
    );
    const loader = document.getElementById("loader");

    const maxCards = getMaxCards();
    const cardsForLoad = tarjetas.slice(lastCard, lastCard + maxCards);

    renderCards(cardsForLoad, cardsContainer);

    lastCard += cardsForLoad.length;

    if (lastCard >= tarjetas.length) {
      loader.style.display = "none";
      window.removeEventListener("scroll", loadCardsOnScroll);
    }

    isLoading = false;
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
    loader.style.display = "none";
    isLoading = false;
  }
}

function renderCards(cardsForLoad, cardsContainer) {
  cardsForLoad.forEach((tarjeta) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card_");
    const pageName = encodeURIComponent(tarjeta.nombre);
    const pageGroup = encodeURIComponent(tarjeta.origen);

    const dlcSpan = tarjeta.dlc ? `<span class="dlc_span">DLC</span>` : "";
    const cardContent = `
      <div class="card_struct active">
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
            <a class="card_link" href="games-details?game=${pageName}&group=${pageGroup}&item=${
      tarjeta.id
    }">
              <div class="card_price">
                <span class="card_text">Desde</span>
                <span class="price">CLP$ ${Number(
                  tarjeta.precio_original
                ).toLocaleString("es-CL")}</span>
              </div>
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
  });
}
