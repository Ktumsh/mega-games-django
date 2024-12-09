document.addEventListener("DOMContentLoaded", () => {
  const errorMsg = document.getElementById("error_display");
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  document
    .getElementById("create_account")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const res = await fetch("/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
          email: email.value,
          username: username.value,
          password: password.value,
        }),
      });

      const resJson = await res.json();

      if (!res.ok) {
        errorMsg.textContent = resJson.message || "An error occurred";
        errorMsg.classList.remove("hidden");
        username.classList.add("error");
        email.classList.add("error");
        password.classList.add("error");
      } else if (resJson.redirect) {
        window.location.href = resJson.redirect;
      }
    });

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
