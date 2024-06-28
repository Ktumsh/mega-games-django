document.addEventListener("DOMContentLoaded", function () {
  const headerNotification = document.getElementById(
    "header_notification_area"
  );
  const accountName = document.getElementById("account_name");
  const sessionLink = document.getElementById("session_link");
  const accountPulldown = document.getElementById("account_pulldown");
  const logoutLink = document.getElementById("logout_link");
  const logoutMenuLink = document.getElementById("logout");

  fetch("/api/check-auth/")
    .then((response) => response.json())
    .then((data) => {
      if (data.isAuthenticated) {
        accountPulldown.textContent = data.username;
        sessionLink.style.display = "none";
        headerNotification.style.display = "inline-block";
        accountPulldown.style.display = "inline-block";
        accountName.textContent = data.username;

        if (logoutLink) {
          logoutLink.addEventListener("click", function (event) {
            event.preventDefault();
            fetch("/logout/", {
              method: "POST",
              headers: {
                "X-CSRFToken": getCookie("csrftoken"),
              },
            }).then(() => {
              window.location.href = "/logout";
            });
          });
        }

        if (logoutMenuLink) {
          logoutMenuLink.addEventListener("click", function (event) {
            event.preventDefault();
            fetch("/logout/", {
              method: "POST",
              headers: {
                "X-CSRFToken": getCookie("csrftoken"),
              },
            }).then(() => {
              window.location.href = "/logout";
            });
          });
        }
      } else {
        sessionLink.style.display = "inline-block";
        headerNotification.style.display = "none";
        accountPulldown.style.display = "none";
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
