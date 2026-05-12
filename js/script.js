/*
        =========================================================================================
        DARK MODE FUNCTIONALITY
        =========================================================================================
        */

const themeSwitch = document.getElementById("themeSwitch");

/*
        LOAD SAVED THEME
        */

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");

  themeSwitch.checked = true;
}

/*
        TOGGLE DARK/LIGHT MODE
        */

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    document.body.classList.add("dark-mode");

    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");

    localStorage.setItem("theme", "light");
  }
});

/*
        =========================================================================================
        SIMPLE CARD ANIMATION
        =========================================================================================
        */

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
  card.style.opacity = "0";

  card.style.transform = "translateY(20px)";

  setTimeout(() => {
    card.style.transition = "0.6s ease";

    card.style.opacity = "1";

    card.style.transform = "translateY(0px)";
  }, index * 150);
});
