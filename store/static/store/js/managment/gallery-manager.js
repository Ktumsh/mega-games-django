export function setupGallery(galeria, nombre) {
  const galleryContainer = document.getElementById("galery");
  galeria.forEach((imagen) => {
    const galeryItem = document.createElement("div");
    galeryItem.classList.add("galery_item");
    galeryItem.innerHTML = `
          <div class="galery_image">
            <a href="${imagen}" data-size="1200x675">
              <img class="gameGaleryImage" src="${imagen}" alt="${nombre}" />
            </a>
          </div>
        `;
    galleryContainer.appendChild(galeryItem);
  });

  const galleryElements = document.querySelectorAll("#galery a");

  galleryElements.forEach((el, i) => {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      openPhotoSwipe(i, galleryElements);
    });
  });
}

function parseThumbnailElements(galleryElements) {
  const items = [];
  galleryElements.forEach((el) => {
    const size = el.getAttribute("data-size").split("x");
    const item = {
      src: el.getAttribute("href"),
      w: parseInt(size[0], 10),
      h: parseInt(size[1], 10),
      el: el,
      msrc: el.querySelector("img").getAttribute("src"),
      title: el.querySelector("img").getAttribute("alt"),
    };
    items.push(item);
  });
  return items;
}

function openPhotoSwipe(index, galleryElements) {
  const pswpElement = document.querySelectorAll(".pswp")[0];
  const items = parseThumbnailElements(galleryElements);
  const options = {
    index: index,
    bgOpacity: 0.8,
    showHideOpacity: true,
    shareEl: false,
    getThumbBoundsFn: function (index) {
      const thumbnail = items[index].el.querySelector("img");
      const pageYScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const rect = thumbnail.getBoundingClientRect();
      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
    },
  };
  const gallery = new PhotoSwipe(
    pswpElement,
    PhotoSwipeUI_Default,
    items,
    options
  );
  gallery.init();
}
