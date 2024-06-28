const body = $(".v6");
const addToCartButton = $(".add_to_cart button");

function createModal(gameData) {
  const priceNumber = parseFloat(gameData.price.replace(".", ""));
  const formattedPrice = priceNumber.toLocaleString("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let originalPriceHTML = "";
  if (gameData.discount && gameData.originalPrice) {
    const originalPriceNumber = parseFloat(
      gameData.originalPrice.replace(".", "")
    );
    const formattedOriginalPrice = originalPriceNumber.toLocaleString("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
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
  if (gameData.discount) {
    discountHTML = `<span id="discount" class="discount">${gameData.discount}</span>`;
  }

  const modalHTML = `
    <div class="full_modal_overlay" style="display: block;">
      <div class="modal_overlay_content modal_overlay_background"></div>
      <div class="modal_overlay_content active" tabindex="-1">
        <div class="modal_position event_display_share_dialog" tabindex="0">
          <div class="modal_position_content">
            <div class="modal_position_top_bar"></div>
            <div class="modal_position_dismiss">
              <div class="close_button">
                <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="256px" height="256px" viewBox="0 0 256 256">
                  <line fill="none" stroke="#FFFFFF" stroke-width="45" stroke-miterlimit="10" x1="212" y1="212" x2="44" y2="44"></line>
                  <line fill="none" stroke="#FFFFFF" stroke-width="45" stroke-miterlimit="10" x1="44" y1="212" x2="212" y2="44"></line>
                </svg>
              </div>
            </div>
            <div class="dialog_content dialog_layout generic_confirm_dialog dialog_center_vertically">
              <div class="dialog_content_inner_width">
                <div class="dialog_header">¡Añadido a tu carro!</div>
                <div class="dialog_body">
                  <div class="dialog_body_text">
                    <div class="dialog_game_area_ctn">
                      <div class="label_area">
                        <div class="dialog_game_image">
                          <a href="">
                            <img id="dialogGameImage" src="${
                              gameData.image
                            }" alt="" />
                          </a>
                        </div>
                        <div class="dialog_game_info">
                          <div class="game_info d_game_title">
                            <div id="dialogGameTitle" class="title">${
                              gameData.title
                            }</div>
                          </div>
                          <div class="game_info d_game_platform">
                            <div id="dialogPlatform" class="platform_label">
                              ${gameData.platforms
                                .map(
                                  (platform) =>
                                    `<span title="Disponible en ${platform}" class="platform_img ${platform}"></span>`
                                )
                                .join("")}
                            </div>
                          </div>
                          <div class="game_price">
                            <span class="price">
                                ${discountHTML}
                                ${originalPriceHTML}
                            </span>
                          </div>
                          <div class="game_info d_game_additional">
                            <div class="add_delete">
                              <div class="add" data-id="${
                                gameData.id
                              }" data-group="offerCards" data-index="0" title="Añadir otra copia de este artículo a tu carro">Añadir</div> | 
                              <div class="delete" data-id="${
                                gameData.id
                              }" data-group="offerCards" data-index="0-0">Eliminar</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="dialog_footer">
                    <button class="cart_page_btn keep_shopping" type="button">Seguir comprando</button>
                    <a href="/cart" class="cart_page_btn topay_bottom">Ver mi carro</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  $(".full_modal_overlay").remove();

  $("body").append(modalHTML);

  $(".close_button, .keep_shopping").on("click", function () {
    $(".full_modal_overlay").remove();
    body.removeClass("hidden_body");
  });
}

addToCartButton.on("click", function () {
  const gameData = $(this).data("game");
  createModal(gameData);
  body.addClass("hidden_body");
});
