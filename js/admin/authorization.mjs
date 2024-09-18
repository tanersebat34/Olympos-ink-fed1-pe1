document.addEventListener("DOMContentLoaded", () => {
  const adminLogo = document.getElementById("adminLogo");
  const adminName = document.getElementById("adminName");
  const loginBtn = document.getElementById("loginBtn");

  const accessToken = sessionStorage.getItem("accessToken");
  const adminUser = JSON.parse(sessionStorage.getItem("admin-user"));

  if (accessToken && adminUser) {
    adminLogo.src = adminUser.avatar.url;
    adminName.textContent = adminUser.name;

    adminLogo.style.display = "block";
    adminName.style.display = "block";

    loginBtn.textContent = "Logout";
    loginBtn.classList.remove("login");
    loginBtn.classList.add("logout");
    loginBtn.href = "#";

    loginBtn.addEventListener("click", () => {
      sessionStorage.clear();

      window.location.href = "/";
    });
  } else {
    adminLogo.style.display = "none";
    adminName.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const adminConsole = document.getElementById("admin-console");
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken) {
    adminConsole.style.display = "flex";
  } else {
    adminConsole.style.display = "none";
  }
});
