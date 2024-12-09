document.addEventListener("DOMContentLoaded", async () => {
  async function cargarYAgregarTarjetas(carouselId, origin) {
    try {
      const endpoint = `/api/games/${origin}/`;
      const response = await fetch(endpoint);
      const tarjetas = await response.json();

      const cardsContainer = document.getElementById(
        `cardsContainer${carouselId}`
      );
      const maxTarjetas = 10;

      tarjetas.slice(0, maxTarjetas).forEach((tarjeta) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card_");
        const dlcSpan = tarjeta.dlc ? `<span class="dlc_span">DLC</span>` : "";

        const pageName = encodeURIComponent(tarjeta.nombre);
        const pageGroup = encodeURIComponent(tarjeta.origen);
        let cardContent;

        switch (carouselId) {
          case 1:
            cardContent = `
              <div class="card_struct active border-p3">
                <div class="card_content">
                  <div class="card_img">
                    <div class="img_card_content">
                      <picture>
                        <img class="img_card" src="${tarjeta.imagen}" alt="${
              tarjeta.nombre
            }">
                      </picture>
                    </div>
                  </div>
                  <div class="card_top_body">
                    <div class="card_title">
                      <span>${dlcSpan}${tarjeta.nombre}</span>
                    </div>
                  </div>
                  <div class="card_bottom_body">
                    <a class="card_link" href="/offer-details?game=${pageName}&group=${pageGroup}&item=${
              tarjeta.id
            }">
                      <div class="fs-sm d-flex flex-row flex-lg-column gap-sm-2">
                        <div class="d-flex align-items-center h-100">
                          <span class="descuento_label p-1">${
                            tarjeta.descuento
                          }</span>
                        </div>
                        <div>
                          <div class="d-inline-flex flex-row flex-sm-column flex-lg-row p-1 gap-1 bg-p1">
                            <p class="descuento-precio mb-0 position-relative motiva-sans">$ ${formatPrice(
                              tarjeta.precio_original
                            )}</p>
                            <p class="mb-0 fw-semibold text-p3 motiva-sans">CLP$ ${formatPrice(
                              tarjeta.precio_descuento
                            )}</p>
                          </div>
                        </div>
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
            break;
          case 2:
            cardContent = `
              <div class="card_struct active">
                <div class="card_content">
                  <div class="card_img">
                    <div class="img_card_content">
                      <picture>
                        <img class="img_card" src="${tarjeta.imagen}" alt="${
              tarjeta.nombre
            }">
                      </picture>
                    </div>
                  </div>
                  <div class="card_top_body">
                    <div class="card_title">
                      <span>${dlcSpan}${tarjeta.nombre}</span>
                    </div>
                  </div>
                  <div class="card_bottom_body">
                    <a class="card_link" href="/games-details?game=${pageName}&group=${pageGroup}&item=${
              tarjeta.id
            }">
                      <div class="card_price">
                        <span class="card_text">Desde</span>
                        <span class="price">CLP$ ${formatPrice(
                          tarjeta.precio_original
                        )}</span>
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
            break;
          case 3:
            cardContent = `
              <div class="card_struct card_struct_2 active">
                <div class="card_content">
                  <div class="card_img">
                    <div class="img_card_content">
                      <picture>
                        <img class="img_card" src="${tarjeta.imagen}" alt="${
              tarjeta.nombre
            }">
                      </picture>
                    </div>
                  </div>
                  <div class="card_top_body">
                    <div class="card_title">
                      <span>${dlcSpan}${tarjeta.nombre}</span>
                    </div>
                  </div>
                  <div class="card_bottom_body">
                    <a class="card_link" href="/gift-details?game=${pageName}&group=${pageGroup}&item=${
              tarjeta.id
            }">
                      <div class="card_price">
                        <span class="card_text">Desde</span>
                        <span class="price">CLP$ ${formatPrice(
                          tarjeta.precio_original
                        )}</span>
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
            break;
        }

        cardElement.innerHTML = cardContent;
        cardsContainer.appendChild(cardElement);
      });
    } catch (error) {
      console.error("Error al cargar las tarjetas:", error);
    }
  }

  await cargarYAgregarTarjetas(1, "offerCards");
  initializeOfferCarousel();

  await cargarYAgregarTarjetas(2, "gamesCards");
  initializeGamesCarousel();

  await cargarYAgregarTarjetas(3, "giftCards");
  initializeGiftCarousel();

  async function cargarTarjetasGeneros() {
    try {
      const response = await fetch("/static/store/api/gen_cards.json");
      const tarjetas = await response.json();
      const genContainer = document.getElementById("genCardContainer");

      tarjetas.forEach((tarjeta, index) => {
        const cardElement = document.createElement("a");
        cardElement.classList.add("gen-card");
        cardElement.href = "javascript:void(0)";

        const cardContent = `
          <div class="gen-card-quantity">${tarjeta.cantidad}</div>
          <img src="${tarjeta.imagen}" width="40" height="40" alt="${tarjeta.titulo}" loading="lazy"/>
          <div class="gen-card-title">${tarjeta.titulo}</div>
        `;

        if (index >= 5) {
          cardElement.classList.add("d-none");
        }

        cardElement.innerHTML = cardContent;
        genContainer.appendChild(cardElement);
      });
    } catch (error) {
      console.error("Error al cargar las tarjetas de géneros:", error);
    }
  }

  await cargarTarjetasGeneros();
  loadGenres();
});
