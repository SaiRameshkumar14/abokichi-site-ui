function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
}

function openVideo() {
  document.getElementById("videoPopup").style.display = "flex";
}

function closeVideo() {
  document.getElementById("videoPopup").style.display = "none";
}

// ESC key closes popup
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeVideo();
  }
});
