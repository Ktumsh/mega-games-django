let lastCard = 10;
let isLoading = false;
let cardData = [];
let currentSlideIndex = 0;
let intervalId;
let currentBackgroundIndex = 0;
let backgroundIntervalId;
const maxImages = 10;
const transitionTime = 8000;

function getMaxCards() {
  const isTablet = window.innerWidth <= 1024 && window.innerWidth >= 768;
  return isTablet ? 9 : 8;
}

async function fetchDesktopCardData() {
  try {
    const response = await fetch("/api/games/");
    const games = await response.json();
    cardData = games
      .filter((game) => game.origen === "offerCards")
      .slice(0, maxImages);
    removeMobileCarousel();
    renderDesktopCarouselItems();
    updateScrollBar();
    updateBackground();
    stopCarouselAutoChange();
    startCarouselAutoChange();
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

async function fetchMobileCardData() {
  try {
    const response = await fetch("/api/games/");
    const games = await response.json();
    cardData = games
      .filter((game) => game.origen === "offerCards")
      .slice(0, maxImages);
    removeDesktopCarousel();
    renderMobileCarouselItems();
    updateBackground();
    startBackgroundAutoChange();
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

function loadDesktopCarousel() {
  const carousel = document.getElementById("carousel");
  carousel.innerHTML = "";
  const carouselBody = document.createElement("div");
  carouselBody.classList.add("slider_body");

  carouselBody.innerHTML = `
    <button id="carouselBackButton" type="button" aria-label="previous" class="carousel_back_button carousel_button">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="100px" viewBox="0 0 50 100">
        <polygon fill="#ffffff" points="0,0.093 0,25.702 24.323,50.026 0,74.349 0,99.955 49.929,50.026"></polygon>
      </svg>
    </button>
    <div class="carousel_slider horizontal_slider">
      <div class="slider_wrapper">
        <div id="sliderTray" class="slider_tray" style="display: flex; align-items: stretch; width: 1000%; transform: translateX(0%) translateX(0px); flex-direction: row;"></div>
      </div>
    </div>
    <button id="carouselNextButton" type="button" aria-label="next" class="carousel_next_button carousel_button">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="100px" viewBox="0 0 50 100">
        <polygon fill="#ffffff" points="0,0.093 0,25.702 24.323,50.026 0,74.349 0,99.955 49.929,50.026"></polygon>
      </svg>
    </button>
  `;

  const carouselScrollBar = document.createElement("div");
  carouselScrollBar.classList.add("slider_bar");
  carouselScrollBar.innerHTML = `
    <div class="slider_bar_ctn">
      <div class="bar_fill"></div>
      <div class="bar_thumb" style="left: 0%; right: 85.7143%"></div>
      <div id="leftBar" class="scroll_bar" style="left: 0%; width: 7.14286%">
        <button type="button" aria-label="previous" class="carousel_back_button bar_btn bar_buttons"></button>
      </div>
      <div id="rightBar" class="scroll_bar" style="right: 0%; width: 92.8571%">
        <button type="button" aria-label="next" class="carousel_next_button bar_btn bar_buttons"></button>
      </div>
    </div>
  `;
  carousel.appendChild(carouselBody);
  carousel.appendChild(carouselScrollBar);
}

let isTablet;
let isMobile;

function updateIsTablet() {
  isTablet = window.innerWidth >= 576 && window.innerWidth <= 910;
  updateImages();
}

function updateIsMobile() {
  isMobile = window.innerWidth <= 576;
  updateImages();
}

function updateImages() {
  const cards = document.querySelectorAll(".capsule_img img");
  cards.forEach((card, index) => {
    const cardInfo = cardData[index];
    if (cardInfo) {
      const imageUrl =
        isTablet || isMobile ? cardInfo.imagen_alternativa : cardInfo.imagen;
      card.src = imageUrl;
    }
  });
}

window.addEventListener("resize", () => {
  updateIsTablet();
  updateIsMobile();
  stopCarouselAutoChange();
  startCarouselAutoChange();
});

updateIsTablet();
updateIsMobile();

function formatDate(dateString) {
  const months = {
    enero: "ene",
    febrero: "feb",
    marzo: "mar",
    abril: "abr",
    mayo: "may",
    junio: "jun",
    julio: "jul",
    agosto: "ago",
    septiembre: "sep",
    octubre: "oct",
    noviembre: "nov",
    diciembre: "dic",
  };

  const [day, month, year] = dateString.split(" de ");
  return `${parseInt(day)} ${months[month]} ${year}`;
}

function renderDesktopCarouselItems() {
  const sliderTray = document.getElementById("sliderTray");
  sliderTray.innerHTML = "";

  cardData.forEach((card, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel_item");
    carouselItem.setAttribute("data-index", index);
    carouselItem.style.width = "10%";
    carouselItem.style.paddingBottom = "unset";
    carouselItem.style.height = "unset";

    const pageName = encodeURIComponent(card.nombre);
    const pageGroup = encodeURIComponent(card.origen);

    const lanzamiento =
      card.detalles && card.detalles.length > 0
        ? formatDate(card.detalles[0].lanzamiento)
        : "Fecha no disponible";

    const dlcSpan = card.dlc ? `<span class="dlc_span">DLC</span>` : "";

    carouselItem.innerHTML = `
      <div class="slider_inner" style="position: unset">
        <div>
          <div class="carousel_capsule">
            <div class="ImpressionTrackedElement">
              <div class="capsule">
                <div class="capsule_ctn">
                  <a href="offer-details?game=${pageName}&group=${pageGroup}&item=${
      card.id
    }"
                    class="capsule_img_ctn">
                    <div class="capsule_decorators"></div>
                    <div class="capsule_img">
                      <img src="" alt="${card.nombre_maincap}" />
                    </div>
                    <div>
                      <div class="capsule_bottom_bar">
                        <span class="platform_label">
                          ${card.disponible_en
                            .slice(0, 2)
                            .map(
                              (platform) =>
                                `<span title="Disponible en ${platform}" class="platform_img ${platform}"></span>`
                            )
                            .join("")}
                        </span>
                        <span class="price_ctn">
                          <div class="disconunt_label">
                            <div class="discount">${card.descuento}</div>
                            <div class="price_label">
                              <div class="original_price">CLP$${Number(
                                card.precio_original
                              ).toLocaleString("es-CL")}</div>
                              <div class="final_price">CLP$${Number(
                                card.precio_descuento
                              ).toLocaleString("es-CL")}</div>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  </a>
                  <div class="capsule_body_ctn">
                    <div class="capsule_top">
                      <div class="capsule_top_ctn">
                        <a href="offer-details?game=${pageName}&group=${pageGroup}&item=${
      card.id
    }"
                          class="capsule_title">
                          ${dlcSpan}${card.nombre_maincap}
                        </a>
                        <div class="release_date">Fecha de lanzamiento: <span>${lanzamiento}</span></div>
                        <div class="review">
                          <a href="#" class="review_link" target="_blank">
                            <div class="review_ctn">
                              <div>Mayormente positivas</div>
                              <div class="review_likes">| ${
                                card.likes
                              } Reseñas de usuarios</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="capsule_tags">
                      <div class="date_and_platform">
                        <div class="release_date"><span>${lanzamiento}</span></div>
                        <span class="platform_label">
                          ${card.disponible_en
                            .map(
                              (platform) =>
                                `<span class="platform_img ${platform}"></span>`
                            )
                            .join("")}
                        </span>
                      </div>
                      ${card.generos
                        .map(
                          (tag) => `<a href="#" class="widget_tag">${tag}</a>`
                        )
                        .join("")}
                    </div>
                    <div class="capsule_description">
                      <div class="capsule_title_description">Por qué te puede interesar este juego:</div>
                      <div class="capsule_description_ctn">
                        <div class="desc_item">
                          <div class="desc_check">
                            <svg version="1.1" id="base" xmlns="http://www.w3.org/2000/svg" class="SVGIcon_Button SVGIcon_Check" x="0px" y="0px" width="256px" height="256px" viewBox="0 0 256 256" stroke-width="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><polyline fill="none" points="49.5,147.75 95,210.75 206.5,45.25 "></polyline></svg>
                          </div>
                          <div class="desc_text">
                            <div>
                              <span class="desc_span">Clasificados</span>
                              entre los más vendidos
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="capsule_price">
                      <div class="capsule_price_ctn">
                        <div class="c_add_to_cart">
                          <span>Añadir al carro</span>
                        </div>
                        <span class="price_ctn">
                          <div class="disconunt_label">
                            <div class="discount">${card.descuento}</div>
                            <div class="price_label">
                              <div class="original_price">CLP$${Number(
                                card.precio_original
                              ).toLocaleString("es-CL")}</div>
                              <div class="final_price">CLP$${Number(
                                card.precio_descuento
                              ).toLocaleString("es-CL")}</div>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div class="additional_image_capsule">
                      <div class="additional_image_ctn">
                        <img class="additional_image" src="${
                          card.imagen_alternativa
                        }" alt="${card.nombre_maincap}">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    sliderTray.appendChild(carouselItem);
  });
  updateImages();
}

function removeDesktopCarousel() {
  const desktopCarousel = document.getElementById("carousel");
  if (desktopCarousel) {
    desktopCarousel.innerHTML = "";
  }
}

function renderMobileCarouselItems() {
  const mobileContentCarousel = document.getElementById("mobileCarousel");
  mobileContentCarousel.style.gap = "12px";
  mobileContentCarousel.innerHTML = "";

  cardData.forEach((card) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel_item");
    const pageName = encodeURIComponent(card.nombre);
    const pageGroup = encodeURIComponent(card.origen);
    const plataformas =
      card.disponible_en && card.disponible_en.length > 0
        ? card.disponible_en
        : ["win"];
    const dlcSpan = card.dlc ? `<span class="dlc_span">DLC</span>` : "";
    carouselItem.innerHTML = `
<div class="ImpressionTrackedElement">
  <div>
    <div class="capsule">
      <div class="capsule_ctn">
        <a href="offer-details?game=${pageName}&group=${pageGroup}&item=${
      card.id
    }"
          class="capsule_img_ctn">
          <div class="capsule_decorators"></div>
          <div class="capsule_img">
            <img src="${card.imagen_alternativa}" alt="${
      card.nombre_maincap
    }" />
          </div>
        </a>
        <div class="capsule_body_ctn">
          <div class="capsule_top">
            <div class="capsule_top_ctn">
              <a href="offer-details?game=${pageName}&group=${pageGroup}&item=${
      card.id
    }"
                class="capsule_title">
                ${dlcSpan}${card.nombre_maincap}
              </a>
            </div>
          </div>
          <div class="capsule_tags">
            <div class="date_and_platform">
              <span class="platform_label">
                ${plataformas
                  .map(
                    (platform) =>
                      `<span class="platform_img ${platform}"></span>`
                  )
                  .join("")}
              </span>
            </div>
          </div>
          <div class="capsule_price">
          <div class="capsule_price_ctn">
            <div class="c_add_to_cart">
              <span>Añadir al carro</span>
            </div>
            <span class="price_ctn">
              <div class="disconunt_label">
                <div class="discount">${card.descuento}</div>
                <div class="price_label">
                  <div class="original_price">CLP$${Number(
                    card.precio_original
                  ).toLocaleString("es-CL")}</div>
                  <div class="final_price">CLP$${Number(
                    card.precio_descuento
                  ).toLocaleString("es-CL")}</div>
                </div>
              </div>
            </span>
          </div>
        </div>
          <div class="additional_image_capsule">
            <div class="additional_image_ctn">
              <img class="additional_image" src="${
                card.imagen_alternativa
              }" alt="${card.nombreMaincap}">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
    mobileContentCarousel.appendChild(carouselItem);
  });
}

function removeMobileCarousel() {
  const mobileCarousel = document.getElementById("mobileCarousel");
  if (mobileCarousel) {
    mobileCarousel.innerHTML = "";
  }
}

const mobileMediaQuery = window.matchMedia("(max-width: 576px)");

function screenSizeChange(mq) {
  if (mq.matches) {
    fetchMobileCardData();
  } else {
    removeDesktopCarousel();
    loadDesktopCarousel();
    fetchDesktopCardData().then(() => {
      addCarouselEventListeners();
      updateVisibleItems();
    });
  }
}

screenSizeChange(mobileMediaQuery);
mobileMediaQuery.addEventListener("change", screenSizeChange);

function updateVisibleItems() {
  const sliderTray = document.getElementById("sliderTray");
  const translateXValue = -(currentSlideIndex * 10);
  sliderTray.style.transform = `translateX(${translateXValue}%) translateX(0px)`;
  updateScrollBar();
}

function updateBackground() {
  const pageGameBg = document.getElementById("pageGameBg");
  if (cardData.length > 0) {
    const imageUrl =
      cardData[currentBackgroundIndex % cardData.length].background;
    preloadImage(imageUrl)
      .then(() => {
        pageGameBg.style.backgroundImage = `url(${imageUrl})`;
      })
      .catch((error) => {
        console.error("Error al cargar la imagen de fondo:", error);
      });
    currentBackgroundIndex = (currentBackgroundIndex + 1) % cardData.length;
  }
}

function startBackgroundAutoChange() {
  if (backgroundIntervalId) {
    clearInterval(backgroundIntervalId);
  }
  backgroundIntervalId = setInterval(() => {
    updateBackground();
  }, 8000);
}

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = reject;
  });
}

function updateScrollBar() {
  const leftBar = document.getElementById("leftBar");
  const rightBar = document.getElementById("rightBar");
  const barThumb = document.querySelector(".bar_thumb");

  const scrollPercentage =
    (currentSlideIndex / (cardData.length - 1)) * 85.7143;
  barThumb.style.left = `${scrollPercentage}%`;
  barThumb.style.right = `${85.7143 - scrollPercentage}%`;
  leftBar.style.width = `${7.14286 + scrollPercentage}%`;
  rightBar.style.width = `${92.8571 - scrollPercentage}%`;

  if (currentSlideIndex === 0) {
    leftBar.style.width = `7.14286%`;
    rightBar.style.width = `92.8571%`;
    barThumb.style.left = `0%`;
    barThumb.style.right = `85.7143%`;
  }
}

function startCarouselAutoChange() {
  if (window.innerWidth > 576) {
    intervalId = setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % cardData.length;
      updateVisibleItems();
      updateBackground();
    }, transitionTime);
  }
}

function stopCarouselAutoChange() {
  clearInterval(intervalId);
}

function addCarouselEventListeners() {
  document
    .getElementById("carouselBackButton")
    .addEventListener("click", () => {
      currentSlideIndex =
        (currentSlideIndex - 1 + cardData.length) % cardData.length;
      updateVisibleItems();
      updateBackground();
      stopCarouselAutoChange();
    });

  document
    .getElementById("carouselNextButton")
    .addEventListener("click", () => {
      currentSlideIndex = (currentSlideIndex + 1) % cardData.length;
      updateVisibleItems();
      updateBackground();
      stopCarouselAutoChange();
    });

  document.getElementById("leftBar").addEventListener("click", () => {
    currentSlideIndex =
      (currentSlideIndex - 1 + cardData.length) % cardData.length;
    updateVisibleItems();
    updateBackground();
    stopCarouselAutoChange();
  });

  document.getElementById("rightBar").addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex + 1) % cardData.length;
    updateVisibleItems();
    updateBackground();
    stopCarouselAutoChange();
  });
}

let cardImages = [];

async function loadInitialCards() {
  try {
    const response = await fetch("/api/games/");
    const games = await response.json();
    const cardsContainer = document.getElementById("gameOfferCardsContainer");

    const maxCards = getMaxCards();
    const cardsForLoad = games
      .filter((game) => game.origen === "offerCards")
      .slice(lastCard, lastCard + maxCards);

    renderCards(cardsForLoad, cardsContainer);

    lastCard += cardsForLoad.length;

    cardImages = games.slice(0, maxImages).map((game) => game.imagen);

    preloadImages(cardImages);

    window.addEventListener("scroll", loadCardsOnScroll);
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

function preloadImages(images) {
  return Promise.all(
    images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    })
  );
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
    const games = await response.json();
    const cardsContainer = document.getElementById("gameOfferCardsContainer");
    const loader = document.getElementById("loader");

    const maxCards = getMaxCards();
    const cardsForLoad = games
      .filter((game) => game.origen === "offerCards")
      .slice(lastCard, lastCard + maxCards);

    renderCards(cardsForLoad, cardsContainer);

    lastCard += cardsForLoad.length;

    if (lastCard >= games.length) {
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
  cardsForLoad.forEach((game) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card_");

    const pageName = game.nombre;
    const pageGroup = game.origen;

    const dlcSpan = game.dlc ? `<span class="dlc_span">DLC</span>` : "";
    const cardContent = `
      <div class="card_struct active border-p3">
        <div class="card_content">
          <div class="card_img">
            <div class="img_card_content">
              <picture>
                <img class="img_card" src="${game.imagen}" alt="${
      game.nombre
    }" loading="lazy">
              </picture>
            </div>
          </div>
          <div class="card_top_body">
            <div class="card_title">
              <span>${dlcSpan}${game.nombre}</span>
            </div>
          </div>
          <div class="card_bottom_body">
            <a class="card_link" href="offer-details?game=${pageName}&group=${pageGroup}&item=${
      game.id
    }">
              <div class="fs-sm d-flex flex-row flex-lg-column gap-sm-2">
                <div class="d-flex align-items-center h-100">
                  <span class="descuento_label p-1">${game.descuento}</span>
                </div>
                <div>
                  <div class="d-inline-flex flex-row flex-sm-column flex-lg-row p-1 gap-1 bg-p1">
                    <p class="descuento-precio mb-0 position-relative motiva-sans">CLP$ ${Number(
                      game.precio_original
                    ).toLocaleString("es-CL")}</p>
                    <p class="mb-0 fw-semibold text-p3 motiva-sans">CLP$ ${Number(
                      game.precio_descuento
                    ).toLocaleString("es-CL")}</p>
                  </div>
                </div>
              </div>
              <div class="like_badge">
                <span class="like_span">
                  <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" class="like_icon" style="max-width: 16px; min-width: 16px; height: auto;">
                    <path d="M12,21.844l-9.588-10A5.672,5.672,0,0,1,1.349,5.293h0a5.673,5.673,0,0,1,9.085-1.474L12,5.384l1.566-1.565a5.673,5.673,0,0,1,9.085,1.474h0a5.673,5.673,0,0,1-1.062,6.548Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span class="like_count">${game.likes}</span>
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
