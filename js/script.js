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

document.querySelector(".settings-box .settings-icon").onclick = () => {
  document.querySelector(".settings-box .icon").classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};
const colors = document.querySelectorAll(".colors-list li");
if (window.localStorage.getItem("main_color") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("main_color")
  );
  document.documentElement.style.setProperty(
    "--main-color-alt",
    window.localStorage.getItem("main_color_alt")
  );
  colors.forEach((color) => {
    color.classList.remove("active");
    if (color.dataset.color === window.localStorage.getItem("main_color")) {
      color.classList.add("active");
    }
  });
}
colors.forEach((color) => {
  color.style.backgroundColor = color.dataset.color;
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    document.documentElement.style.setProperty(
      "--main-color-alt",
      e.target.dataset.coloralt
    );
    window.localStorage.setItem("main_color", e.target.dataset.color);
    window.localStorage.setItem("main_color_alt", e.target.dataset.coloralt);
    colors.forEach((color) => {
      color.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
const randomBackgroundButtons = document.querySelectorAll(
  ".random-backgrounds span"
);
randomBackgroundButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    randomBackgroundButtons.forEach((button) => {
      button.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.classList.contains("on")) {
      backgroundOptin = true;
      randomizeBackground();
      window.localStorage.setItem("background_option", true);
    } else {
      backgroundOptin = false;
      clearInterval(backgroundInterval);
      window.localStorage.setItem("background_option", false);
    }
  });
});
const landingPage = document.querySelector(".landing");
let imagesArray = ["landing-01.jpg", "landing-02.jpg", "landing-03.jpg"];
let backgroundOptin = true;
let backgroundInterval;
let backgroundOptinValue = window.localStorage.getItem("background_option");
if (backgroundOptinValue !== null) {
  if (backgroundOptinValue === "true") {
    backgroundOptin = true;
    document.querySelector(".random-backgrounds .on").click();
  } else {
    backgroundOptin = false;
    document.querySelector(".random-backgrounds .off").click();
  }
}
function randomizeBackground() {
  if (backgroundOptin) {
    backgroundInterval = setInterval(() => {
      let randomize = Math.floor(Math.random() * imagesArray.length);
      landingPage.style.backgroundImage = `url('imgs/${imagesArray[randomize]}')`;
    }, 5000);
  }
}
randomizeBackground();
