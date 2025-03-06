const scrollProgress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    scrollProgress.style.display = "block";
  } else {
    scrollProgress.style.display = "none";
  }
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollTop = document.documentElement.scrollTop;
  scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});
const scrollButton = document.querySelector(".scroll-button");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 600) {
    scrollButton.style.display = "flex";
  } else {
    scrollButton.style.display = "none";
  }
});
scrollButton.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth"
  });
};
document.querySelectorAll(".header .main-nav > li > a").forEach(
  (el) =>
    (el.onclick = function (e) {
      e.preventDefault();
    })
);
const megaMenuButton = document.querySelector(
  ".header .main-nav > .mega-menu-button"
);
const megaMenu = document.querySelector(".header .main-nav .mega-menu");
const megaMenuImage = document.querySelector(".header .mega-menu img");
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
const darkModeButtons = document.querySelectorAll(
  ".settings-box .dark-mode span"
);
let darkModeLocalStorage = window.localStorage.getItem("dark_mode");
if (darkModeLocalStorage != null) {
  megaMenuImage.src = "imgs/megamenu-inverted.png";
  document.body.classList.add("dark");
  darkModeButtons.forEach((el) => {
    el.classList.remove("active");
    document
      .querySelector(".settings-box .dark-mode .on")
      .classList.add("active");
  });
}
darkModeButtons.forEach((el) => {
  el.addEventListener("click", function (e) {
    darkModeButtons.forEach((element) => element.classList.remove("active"));
    e.target.classList.add("active");
    if (e.target.classList.contains("on")) {
      document.body.classList.add("dark");
      megaMenuImage.src = "imgs/megamenu-inverted.png";
      window.localStorage.setItem("dark_mode", "dark");
    } else {
      megaMenuImage.src = "imgs/megamenu.png";
      document.body.classList.remove("dark");
      window.localStorage.removeItem("dark_mode");
    }
  });
});
const languageButtons = document.querySelectorAll(
  ".settings-box .language span"
);

languageButtons.forEach((el) => {
  el.addEventListener("click", function (e) {
    languageButtons.forEach((element) => element.classList.remove("active"));
    e.target.classList.add("active");
  });
});
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
document.querySelector("footer .footer-title sub").innerHTML =
  new Date().getFullYear();
