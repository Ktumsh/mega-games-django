let installPrompt;
const isPWA = window.matchMedia("(display-mode: standalone)").matches;

window.addEventListener("beforeinstallprompt", (e) => {
  installPrompt = e;
});

window.addEventListener("appinstalled", () => {
  console.log("PWA instalada");
});

function isMobile() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

const body = document.body;
const modal = document.getElementById("downloadAppModal");
const modalCtn = document.querySelector(".modal_position_content");

window.addEventListener("load", () => {
  const modalShown = sessionStorage.getItem("modalShown") === "true";

  if (isPWA) {
    return;
  }

  if (isMobile() && !modalShown) {
    modal.style.display = "block";
    setTimeout(() => {
      body.classList.add("hidden_body");
      modal.classList.add("show");
      modalCtn.classList.add("show");
    }, 2000);

    const isIOS = /iPhone|iPad/i.test(navigator.userAgent);
    if (isIOS) {
      const iosInfo = document.getElementById("iosInfo");
      iosInfo.style.display = "block";
    }

    sessionStorage.setItem("modalShown", "true");
  }
});

document.querySelector(".close_button").addEventListener("click", () => {
  body.classList.remove("hidden_body");
  modal.classList.remove("show");
  modalCtn.classList.remove("show");
  modal.style.display = "none";
});

document.getElementById("installApp").addEventListener("click", () => {
  if (installPrompt) {
    installPrompt.prompt();
  } else {
    alert(
      "Tienes la aplicación instalada, si crees que se trata de un error, instala la app al final de la página."
    );
  }
});
