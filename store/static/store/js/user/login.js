const errorMsg = document.getElementById("error_msg");
const identifier = document.getElementById("identifier");
const password = document.getElementById("password");

document.getElementById("login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = JSON.stringify({
    username: formData.get("identifier"),
    password: formData.get("password"),
  });

  try {
    const res = await fetch("/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: data,
    });

    if (!res.ok) {
      const resJson = await res.json();
      errorMsg.textContent = resJson.message || "Error desconocido";
      errorMsg.classList.toggle("hidden", false);
      identifier.classList.add("error");
      password.classList.add("error");
      return;
    }

    const resJson = await res.json();
    if (resJson.status === "ok") {
      window.location.href = "/";
    } else {
      errorMsg.textContent = resJson.message || "Error desconocido";
      errorMsg.classList.toggle("hidden", false);
      identifier.classList.add("error");
      password.classList.add("error");
    }
  } catch (error) {
    console.error("Error:", error);
    errorMsg.textContent = "Error de conexión";
    errorMsg.classList.toggle("hidden", false);
    identifier.classList.add("error");
    password.classList.add("error");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/check-auth/")
    .then((response) => response.json())
    .then((data) => {
      if (data.isAuthenticated) {
        window.location.href = "/";
      }
    })
    .catch((error) => console.error("Error al verificar la sesión", error));
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
