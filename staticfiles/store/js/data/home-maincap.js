async function loadGames() {
  try {
    const origins = ["gamesCards", "offerCards", "editorSalePage"];
    const gamesData = await Promise.all(
      origins.map(async (origin) => {
        const response = await fetch(`/api/games/${origin}/`);
        const data = await response.json();
        return { origin, data };
      })
    );

    const carruselContainer = document.getElementById("carouselMaincapItems");

    const selectedGames = [
      { id: 70, origen: "gamesCards" },
      { id: 78, origen: "offerCards" },
      { id: 80, origen: "offerCards" },
      { id: 1, origen: "editorSalePage" },
      { id: 66, origen: "gamesCards" },
      { id: 67, origen: "gamesCards" },
      { id: 111, origen: "offerCards" },
      { id: 112, origen: "offerCards" },
      { id: 68, origen: "gamesCards" },
      { id: 113, origen: "offerCards" },
      { id: 69, origen: "gamesCards" },
      { id: 2, origen: "editorSalePage" },
    ];

    selectedGames.forEach((selection) => {
      const { id, origen } = selection;
      const gameOriginData = gamesData.find((entry) => entry.origin === origen);
      const juego = gameOriginData
        ? gameOriginData.data.find((j) => j.id === id)
        : null;

      if (juego) {
        carruselContainer.innerHTML += generateGameHTML(juego);
      }
    });

    initializeCarousel();
  } catch (error) {
    console.error("Error al cargar los juegos:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadGames);

function formatPrice(price) {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) {
    return price;
  }
  return numericPrice.toLocaleString("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function generateGameHTML(juego) {
  const gameName = juego.nombre;
  const pageName = gameName;
  const pageOrigin =
    juego.origen === "offerCards"
      ? "offer-details"
      : juego.origen === "editorSalePage"
      ? "publisher-sale-details"
      : "games-details";

  const pageGroup =
    juego.origen === "offerCards"
      ? "offerCards"
      : juego.origen === "editorSalePage"
      ? "editorSalePage"
      : "gamesCards";

  const preorderNow =
    juego.nombreMaincap === "Call of Duty®: Black Ops 6" ? true : false;

  const formattedOriginalPrice = juego.precio_original
    ? formatPrice(juego.precio_original)
    : "";
  const formattedDiscountPrice = juego.precio_descuento
    ? formatPrice(juego.precio_descuento)
    : "";

  let precioHTML = "";

  if (juego.descuento && formattedOriginalPrice && formattedDiscountPrice) {
    precioHTML = `
      <div class="discount_block discount_block_inline">
        <div class="discount_pct">${juego.descuento}</div>
        <div class="discount_prices">
          <div class="discount_original_price">CLP$ ${formattedOriginalPrice}</div>
          <div class="discount_final_price">CLP$ ${formattedDiscountPrice}</div>
        </div>
      </div>
    `;
  } else {
    precioHTML = `
      <div class="discount_block no_discount discount_block_inline">
        <div class="discount_prices">
          <div class="discount_final_price">CLP$ ${formattedOriginalPrice}</div>
        </div>
      </div>
    `;
  }

  const galeria = Array.isArray(juego.galeria) ? juego.galeria : [];

  return `
    <a class="store_main_capsule" href="/${pageOrigin}?game=${pageName}&group=${pageGroup}&item=${
    juego.id
  }" data-bs-interval="5000">
      <div class="capsule main_capsule" style="background-image: url(${
        juego.imagen_alternativa
      });"></div>
      <div class="info">
        <div class="app_name">
          <div>${juego.nombre_maincap}</div>
        </div>
        <div class="screenshots">
          ${galeria
            .slice(0, 4)
            .map(
              (imagen) => `
            <div>
              <div style="background-image: url(${imagen});"></div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="reason">
          <div class="main default">${
            preorderNow ? "Precómpralo ahora" : "Ya disponible"
          }</div>
          <div class="additional">
            <div class="bg-gradient blur">Lo más vendido</div>
          </div>
        </div>
        ${precioHTML}    
        <div class="platforms">
          ${juego.disponible_en
            .map(
              (plataforma) => `
            <span class="platform_img ${plataforma}"></span>
          `
            )
            .join("")}
        </div>
      </div>
    </a>
  `;
}
