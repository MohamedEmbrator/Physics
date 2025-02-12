const megaMenuButton = document.querySelector(
  ".header .main-nav > .mega-menu-button"
);
const megaMenu = document.querySelector(".header .main-nav > li .mega-menu");

megaMenuButton.addEventListener("click", function (event) {
  event.stopPropagation();
  megaMenu.classList.toggle("show");
});

document.addEventListener("click", function (event) {
  if (
    !megaMenu.contains(event.target) &&
    !megaMenuButton.contains(event.target)
  ) {
    megaMenu.classList.remove("show");
  }
});
const landing = document.querySelector(".landing");
let imgs = ["landing-01.jpg", "landing-02.jpg", "landing-03.jpg"];
setInterval(() => {
  let randomIndex = Math.floor(Math.random() * imgs.length);
  landing.style.backgroundImage = `url("imgs/${imgs[randomIndex]}")`;
}, 5000);
