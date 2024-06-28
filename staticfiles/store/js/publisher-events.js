function loadPulisherCards() {
  $(document).ready(function () {
    const saleSectionGrid1 = $("#sale_section_grid_1");
    const saleSectionGrid2 = $("#sale_section_grid_2");
    const saleSectionGrid3 = $("#sale_section_grid_3");
    const saleSectionGrid4 = $("#sale_section_grid_4");
    const saleSectionGrid5 = $("#sale_section_grid_5");
    const saleSectionGrid6 = $("#sale_section_grid_6");
    const saleSectionGrid7 = $("#sale_section_grid_7");
    const saleSectionGrid8 = $("#sale_section_grid_8");
    const saleSectionGrid9 = $("#sale_section_grid_9");

    const panel1 = $("#panel_1");
    const panel2 = $("#panel_2");
    const panel3 = $("#panel_3");
    const panel4 = $("#panel_4");
    const panel5 = $("#panel_5");

    const additionalDiv = $("<div></div>");
    const additionalDiv2 = $("<div></div>");
    const additionalDiv3 = $("<div></div>");
    const additionalDiv4 = $("<div></div>");

    const centeredCard1 = $("<div></div>");
    const centeredCard2 = $("<div></div>");
    const centeredCard3 = $("<div></div>");
    const centeredCard4 = $("<div></div>");

    const lastCard1 = saleSectionGrid1.children().last();
    const lastCard2 = saleSectionGrid2.children().last();
    const lastCard3 = saleSectionGrid3.children().last();
    const lastCard4 = saleSectionGrid4.children().last();
    const lastCard5 = saleSectionGrid6.children().last();
    const lastCard6 = saleSectionGrid8.children().last();

    const additionalSectionGrid1 = $("<div></div>");
    const additionalSectionGrid2 = $("<div></div>");
    const additionalSectionGrid3 = $("<div></div>");

    const lastTwoCards1 = saleSectionGrid3.children().eq(3);
    const secondLastTwoCards1 = saleSectionGrid3.children().eq(4);

    const lastTwoCards2 = saleSectionGrid4.children().eq(3);
    const secondLastTwoCards2 = saleSectionGrid4.children().eq(4);

    const cards3 = saleSectionGrid5.find(".sale_section_card");
    const firstTwoCards1 = saleSectionGrid5.children().eq(0);
    const secondFirstTwoCards1 = saleSectionGrid5.children().eq(1);

    const firstCard1 = saleSectionGrid4.children().first();

    function aplicarEstilos() {
      if (window.matchMedia("(max-width: 576px)").matches) {
        saleSectionGrid1.css(
          "grid-template-columns",
          "repeat(2, minmax(0px, 1fr))"
        );
        centeredCard1.addClass("sale_section_grid_ctn");
        centeredCard1.css(
          "grid-template-columns",
          "minmax(0px, 0.5fr) repeat(1, minmax(0px, 1fr)) minmax(0px, 0.5fr)"
        );
        centeredCard1.append(additionalDiv, lastCard1, additionalDiv2);
        panel1.append(centeredCard1);

        saleSectionGrid2.append(lastCard2);
        saleSectionGrid2.css(
          "grid-template-columns",
          "repeat(2, minmax(0px, 1fr))"
        );

        additionalSectionGrid1.remove();
        additionalSectionGrid2.remove();

        saleSectionGrid3.append(lastTwoCards1);
        saleSectionGrid4.children().eq(1).before(firstCard1);

        saleSectionGrid3.css(
          "grid-template-columns",
          "repeat(2, minmax(0px, 1fr))"
        );
        saleSectionGrid4.css(
          "grid-template-columns",
          "repeat(2, minmax(0px, 1fr))"
        );
        additionalSectionGrid3.addClass("sale_section_grid_ctn");
        additionalSectionGrid3.css(
          "grid-template-columns",
          "repeat(2, minmax(0px, 1fr))"
        );
        saleSectionGrid5.css(
          "grid-template-columns",
          "repeat(2, minmax(0px, 1fr))"
        );

        saleSectionGrid4.children().first().before(lastCard3);

        additionalSectionGrid3.prepend(
          lastTwoCards2,
          secondLastTwoCards2,
          firstTwoCards1,
          secondFirstTwoCards1
        );
        panel3.children().eq(2).before(additionalSectionGrid3);

        saleSectionGrid6.append(lastCard5);
        saleSectionGrid6.css(
          "grid-template-columns",
          "repeat(2, minmax(0px, 1fr))"
        );

        saleSectionGrid8.css(
          "grid-template-columns",
          "repeat(2, minmax(0px, 1fr))"
        );
        centeredCard4.addClass("sale_section_grid_ctn");
        centeredCard4.css(
          "grid-template-columns",
          "minmax(0px, 0.5fr) repeat(1, minmax(0px, 1fr)) minmax(0px, 0.5fr)"
        );
        centeredCard4.append(additionalDiv4, lastCard6);
        panel5.append(centeredCard4);
      } else if (window.matchMedia("(max-width: 910px)").matches) {
        saleSectionGrid1.append(lastCard1);
        saleSectionGrid1.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );

        saleSectionGrid2.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
        centeredCard2.addClass("sale_section_grid_ctn");
        centeredCard2.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
        centeredCard2.prepend(additionalDiv2).append(lastCard2);
        panel2.append(centeredCard2);

        additionalSectionGrid3.remove();
        saleSectionGrid3.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
        additionalSectionGrid1.addClass("sale_section_grid_ctn");
        additionalSectionGrid1.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
        saleSectionGrid4.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
        additionalSectionGrid2.addClass("sale_section_grid_ctn");
        additionalSectionGrid2.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
        saleSectionGrid5.css(
          "grid-template-columns",
          "minmax(0px, 0.5fr) repeat(2, minmax(0px, 1fr)) minmax(0px, 0.5fr)"
        );
        additionalSectionGrid1.append(
          lastTwoCards1,
          secondLastTwoCards1,
          firstCard1
        );
        additionalSectionGrid2.append(
          lastCard4,
          firstTwoCards1,
          secondFirstTwoCards1
        );
        saleSectionGrid4.children().eq(2).before(lastTwoCards2);
        saleSectionGrid5.prepend(additionalDiv);
        panel3.children().eq(1).before(additionalSectionGrid1);
        panel3.children().eq(3).before(additionalSectionGrid2);

        saleSectionGrid6.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
        centeredCard3.addClass("sale_section_grid_ctn");
        centeredCard3.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
        centeredCard3.prepend(additionalDiv3).append(lastCard5);
        panel4.append(centeredCard3);

        centeredCard4.remove();
        saleSectionGrid8.append(lastCard6);
        saleSectionGrid8.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
      } else if (window.matchMedia("(min-width: 910px)").matches) {
        saleSectionGrid1.append(lastCard1);
        saleSectionGrid1.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );

        saleSectionGrid2.append(lastCard2);
        saleSectionGrid2.css(
          "grid-template-columns",
          "repeat(4, minmax(0px, 1fr))"
        );

        additionalSectionGrid1.remove();
        additionalSectionGrid2.remove();
        additionalSectionGrid3.remove();
        saleSectionGrid3.append(lastTwoCards1, secondLastTwoCards1);
        saleSectionGrid4
          .prepend(firstCard1)
          .append(lastTwoCards2, secondLastTwoCards2);
        saleSectionGrid5.children().eq(1).before(firstTwoCards1);
        saleSectionGrid5.children().eq(2).before(secondFirstTwoCards1);
        saleSectionGrid5.prepend(additionalDiv);
        saleSectionGrid3.css(
          "grid-template-columns",
          "repeat(5, minmax(0px, 1fr))"
        );
        saleSectionGrid4.css(
          "grid-template-columns",
          "repeat(5, minmax(0px, 1fr))"
        );
        saleSectionGrid5.css(
          "grid-template-columns",
          "minmax(0px, 0.5fr) repeat(4, minmax(0px, 1fr)) minmax(0px, 0.5fr)"
        );

        saleSectionGrid6.append(lastCard5);
        saleSectionGrid6.css(
          "grid-template-columns",
          "repeat(4, minmax(0px, 1fr))"
        );

        centeredCard4.remove();
        saleSectionGrid8.append(lastCard6);
        saleSectionGrid8.css(
          "grid-template-columns",
          "repeat(3, minmax(0px, 1fr))"
        );
      }
    }

    aplicarEstilos();

    function delay(func) {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, 200);
      };
    }

    const delayAplicarEstilos = delay(aplicarEstilos);

    $(window).on("resize", delayAplicarEstilos);

    const body = $(".v6");
    const modalOverlay = $(".full_modal_overlay");
    const shareButton = $(".social_share_button");
    const closeButton = $(".close_button");
    const closeDialog = $(".dialog_button");
    const alertText = $(".void_div");

    shareButton.on("click", function () {
      modalOverlay.removeAttr("style");
      body.addClass("hidden_body");
    });

    closeButton.on("click", function () {
      modalOverlay.css("display", "none");
      body.removeClass("hidden_body");
      alertText.html("");
    });

    closeDialog.on("click", function () {
      modalOverlay.css("display", "none");
      body.removeClass("hidden_body");
      alertText.html("");
    });

    $("#copy_button").on("click", copyText);
    $("#share_link_text").on("click", function (event) {
      event.preventDefault();
      copyText();
    });

    function copyText() {
      const textarea = $("#share_link_text")[0];
      textarea.select();
      document.execCommand("copy");
      textarea.setSelectionRange(0, 0);
      alertText.html("Enlace copiado");
    }

    function formatNumberWithDots(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const svg = `
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-heart">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
      </svg>
  `;

    function updateActivisionFollows() {
      let $followerText = $("#followers");
      let textContent = parseInt($followerText.text().replace(/\./g, ""));
      let $button = $("#followBtn");
      let $buttonText = $button.find("div");

      $buttonText.html('<span class="loader" id="loader"></span>');
      $button.addClass("loading");
      const $loader = $("#loader");
      $loader.css("display", "block");

      setTimeout(() => {
        if ($button.hasClass("active")) {
          textContent -= 1;
          $buttonText.text("Seguir");
          $button.removeClass("active");
        } else {
          textContent += 1;
          $buttonText.html(svg);
          $button.addClass("active");
        }

        $followerText.text(formatNumberWithDots(textContent));

        $button.removeClass("loading");
        $loader.css("display", "none");
      }, 600);
    }

    let $followerText = $("#followers");
    let initialNumber = parseInt($followerText.text());
    $followerText.text(formatNumberWithDots(initialNumber));

    $("#followBtn").on("click", updateActivisionFollows);
  });
}

export { loadPulisherCards };
