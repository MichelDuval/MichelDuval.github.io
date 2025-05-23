//Scroll transformation nav barre
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  //console.log(window.scrollY);

  if (window.scrollY < 10) {
    nav.classList =
      "nav fixed w-full z-50 transition-all duration-300 bg-gradient-to-r from-green-600 to-violet-600 py-6";
  } else {
    nav.classList =
      "nav fixed w-full z-50 transition-all duration-300 bg-black/90 backdrop-blur-sm py-3 opacity-75";
  }
});

//------------------------------------------------------------------------
//nav barre hidden
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");

// btn.addEventListener("click", () => {
//   menu.classList.toggle("hidden");
// });
btn.addEventListener("click", () => {
  if (menu.classList.contains("hidden")) {
    // Affiche avec animation
    menu.classList.remove("hidden");

    // Force le reflow pour que la transition s’enclenche
    void menu.offsetWidth;

    menu.classList.remove("scale-y-0", "translate-y-2");
    menu.classList.add("scale-y-100", "translate-y-0");
  } else {
    // Ferme avec animation
    menu.classList.remove("scale-y-100", "translate-y-0");
    menu.classList.add("scale-y-0", "translate-y-2");

    // Cache après animation (300ms)
    setTimeout(() => {
      menu.classList.add("hidden");
    }, 300);
  }
});

//--------------------------------------------------------------------------
// Carroussel

const slides = document.querySelectorAll(".testimonial-slide");
const buttons = document.querySelectorAll("button[data-index]");
let currentIndex = 0;

let autoSlideInterval; // pour le défilement continu
let autoSlideDelayTimeout; // pour le délai après clic

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.zIndex = 2;
      slide.classList.add("opacity-100");
      slide.classList.remove("opacity-0");
    } else {
      slide.style.zIndex = 1;
      slide.classList.remove("opacity-100");
      slide.classList.add("opacity-0");
    }
  });
  // Mettre à jour la couleur des boutons
  buttons.forEach((btn, i) => {
    if (i === index) {
      btn.classList.add("bg-green-400");
      btn.classList.remove("bg-white/30");
    } else {
      btn.classList.remove("bg-green-400");
      btn.classList.add("bg-white/30");
    }
  });
  currentIndex = index;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Fonction pour lancer le défilement auto
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000); // toutes les 5 secondes
}

// Lorsqu’on clique sur un bouton
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Annuler le défilement automatique actuel
    clearInterval(autoSlideInterval);
    clearTimeout(autoSlideDelayTimeout); // annuler tout délai en attente
    // Afficher le slide correspondant
    showSlide(parseInt(btn.getAttribute("data-index")));
    // Redémarrer le défilement après 5 secondes
    autoSlideDelayTimeout = setTimeout(() => {
      startAutoSlide();
    }, 5000);
  });
});

// Initialisation
showSlide(currentIndex);
startAutoSlide();

//-------------------------------------------------------------------------
//Formulaire
document.getElementById("formulaire").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche la page de rafraîchir
  // Ensuite, affiche la div comme prévu
  document.getElementById("formulaire").classList.add("hidden");
  document.getElementById("confirmation").classList.remove("hidden");
});

// Lors du clic sur le lien pour réafficher
document.getElementById("reAfficher").addEventListener("click", function (e) {
  e.preventDefault(); // Empêche le comportement par défaut du lien
  document.getElementById("formulaire").classList.remove("hidden");
  document.getElementById("confirmation").classList.add("hidden");
});

// Sélectionne le champ
const phoneInput = document.querySelector("#phone");

// Initialise intl-tel-input
const iti = window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  nationalMode: false,
  separateDialCode: false,
  autoPlaceholder: "polite",
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
  geoIpLookup: function (callback) {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => callback(data.country_code))
      .catch(() => callback("fr")); // Fallback = France
  },
});

// (Facultatif) Bloque la soumission si le numéro est invalide
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    if (!iti.isValidNumber()) {
      e.preventDefault();
      alert("Veuillez entrer un numéro de téléphone valide.");
    }
  });
}
