import { loadPulisherCards } from "../publisher-events.js";

async function loadPublisherData() {
  try {
    const response = await fetch("/api/games/");
    const tarjetas = await response.json();
    const cardsPanels = Array.from({ length: 5 }, (_, i) =>
      document.getElementById(`panel_${i + 1}`)
    );

    const gridColumns = [
      "repeat(3, minmax(0px, 1fr))",
      "repeat(4, minmax(0px, 1fr))",
      "repeat(5, minmax(0px, 1fr))",
      "repeat(5, minmax(0px, 1fr))",
      "minmax(0px, 0.5fr) repeat(4, minmax(0px, 1fr)) minmax(0px, 0.5fr)",
      "repeat(4, minmax(0px, 1fr))",
      "repeat(2, minmax(0px, 1fr))",
      "repeat(3, minmax(0px, 1fr))",
      "repeat(2, minmax(0px, 1fr))",
    ];

    const saleSectionGrids = gridColumns.map((columns, index) => {
      const saleSectionGrid = document.createElement("div");
      saleSectionGrid.id = `sale_section_grid_${index + 1}`;
      saleSectionGrid.classList.add("sale_section_grid_ctn");
      saleSectionGrid.style.gridTemplateColumns = columns;
      return saleSectionGrid;
    });

    saleSectionGrids.forEach((grid, index) => {
      if (index < 2) {
        cardsPanels[index].appendChild(grid);
      } else if (index >= 2 && index < 5) {
        cardsPanels[2].appendChild(grid);
      } else if (index === 5) {
        cardsPanels[3].appendChild(grid);
      } else if (index >= 6) {
        cardsPanels[4].appendChild(grid);
      }
    });

    function createCard(tarjeta, type, removePlatform = false) {
      const pageName = tarjeta.nombre;
      let cardTemplate;

      switch (type) {
        case "special":
          cardTemplate = specialCardTemplate(tarjeta, pageName);
          break;
        case "regular2":
          cardTemplate = regularCard2Template(tarjeta, pageName);
          break;
        default:
          cardTemplate = regularCardTemplate(tarjeta, pageName);
      }

      if (removePlatform) {
        cardTemplate = cardTemplate.replace("platform_img", "");
      }

      return cardTemplate;
    }

    function regularCardTemplate(tarjeta, pageName) {
      const pageGroup = tarjeta.origen;
      return `
        <div class="sale_section_card">
          <div class="sale_section_card_ctn">
            <a href="publisher-sale-details?game=${pageName}&group=${pageGroup}&item=${
        tarjeta.id
      }" style="display: block; cursor: pointer">
              <div class="capsule_decorators"></div>
              <div class="hero_capsule_image_ctn">
                <img class="hero_image" src="${tarjeta.imagen}" alt="${
        tarjeta.nombre
      }">
              </div>
              <div class="capsule_bottom_bar">
                <span class="platform_label">
                  <span class="platform_img ${tarjeta.disponible_en.join(
                    " "
                  )}"></span>
                </span>
                <span class="price_ctn">
                  <div class="disconunt_label">
                    <div class="discount">${tarjeta.descuento}</div>
                    <div class="price_label">
                      <div class="original_price">CLP$${Number(
                        tarjeta.precio_original
                      ).toLocaleString("es-CL")}</div>
                      <div class="final_price">CLP$${Number(
                        tarjeta.precio_descuento
                      ).toLocaleString("es-CL")}</div>
                    </div>
                  </div>
                </span>
              </div>
            </a>
          </div>
        </div>
      `;
    }

    function regularCard2Template(tarjeta, pageName) {
      const pageGroup = tarjeta.origen;
      return `
        <div class="sale_section_card">
          <div class="sale_section_card_ctn">
            <a href="publisher-sale-details?game=${pageName}&group=${pageGroup}&item=${
        tarjeta.id
      }" style="display: block; cursor: pointer">
              <div class="capsule_decorators"></div>
              <div class="capsule_image_ctn">
                <img src="${tarjeta.imagen_alternativa}" alt="${
        tarjeta.nombre
      }" />
              </div>
              <div class="capsule_bottom_bar">
                <span class="platform_label">
                  <span class="platform_img ${tarjeta.disponible_en.join(
                    " "
                  )} me-1"></span>
                </span>
                <span class="price_ctn">
                  <div class="disconunt_label">
                    <div class="discount">${tarjeta.descuento}</div>
                    <div class="price_label">
                      <div class="original_price">CLP$${Number(
                        tarjeta.precio_original
                      ).toLocaleString("es-CL")}</div>
                      <div class="final_price">CLP$${Number(
                        tarjeta.precio_descuento
                      ).toLocaleString("es-CL")}</div>
                    </div>
                  </div>
                </span>
              </div>
            </a>
          </div>
        </div>
      `;
    }

    function specialCardTemplate(tarjeta, pageName) {
      const pageGroup = tarjeta.origen;
      return `
        <div class="sale_section_card">
          <div class="sale_section_card_ctn">
            <a href="publisher-sale-details?game=${pageName}&group=${pageGroup}&item=${
        tarjeta.id
      }" style="display: block; cursor: pointer">
              <div class="capsule_decorators"></div>
              <div class="hero_capsule_image_ctn">
                <div class="hero_capsule_image" style="background-image: url('${
                  tarjeta.imagen
                }');"></div>
                <img class="hero_image_diff" src="${tarjeta.imagen}" alt="${
        tarjeta.nombre
      }">
              </div>
              <div class="capsule_bottom_bar">
                <span class="price_ctn">
                  <div class="disconunt_label">
                    <div class="discount">${tarjeta.descuento}</div>
                    <div class="price_label">
                      <div class="original_price">CLP$${Number(
                        tarjeta.precio_original
                      ).toLocaleString("es-CL")}</div>
                      <div class="final_price">CLP$${Number(
                        tarjeta.precio_descuento
                      ).toLocaleString("es-CL")}</div>
                    </div>
                  </div>
                </span>
              </div>
            </a>
          </div>
        </div>
      `;
    }

    function addCardsToPanel(
      panel,
      tarjetas,
      order,
      type = "regular",
      removePlatform = false
    ) {
      order.forEach((index) => {
        const cardContainer = document.createElement("div");
        cardContainer.innerHTML = createCard(
          tarjetas[index],
          type,
          removePlatform
        );
        panel.appendChild(cardContainer);
      });
    }

    addCardsToPanel(saleSectionGrids[0], tarjetas, [0, 1]);
    addCardsToPanel(saleSectionGrids[0], [tarjetas[2]], [0], "special");
    addCardsToPanel(saleSectionGrids[1], tarjetas.slice(3, 7), [0, 1, 2, 3]);
    addCardsToPanel(
      saleSectionGrids[2],
      tarjetas.slice(0, 7),
      [0, 4, 6, 5, 3],
      "regular",
      true
    );
    addCardsToPanel(
      saleSectionGrids[3],
      tarjetas.slice(2, 12),
      [0, 5, 6, 7, 8],
      "special"
    );
    addCardsToPanel(
      saleSectionGrids[4],
      tarjetas.slice(11, 15),
      [0, 1, 2, 3],
      "special"
    );
    addCardsToPanel(
      saleSectionGrids[5],
      tarjetas.slice(1, 16),
      [0, 14],
      "regular",
      true
    );
    addCardsToPanel(
      saleSectionGrids[5],
      tarjetas.slice(16, 18),
      [0, 1],
      "special"
    );
    addCardsToPanel(
      saleSectionGrids[6],
      tarjetas.slice(18, 20),
      [0, 1],
      "regular2"
    );
    addCardsToPanel(
      saleSectionGrids[7],
      tarjetas.slice(20, 23),
      [0, 1, 2],
      "regular2",
      true
    );
    addCardsToPanel(
      saleSectionGrids[8],
      tarjetas.slice(23, 25),
      [0, 1],
      "regular2"
    );

    loadPulisherCards();
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

loadPublisherData();
