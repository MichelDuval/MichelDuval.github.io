// // Vérifie si l'élément est dans la fenêtre
// function isInViewport(element) {
//   console.log(div.getBoundingClientRect());
//   const rect = element.getBoundingClientRect();
//   return rect.top < window.innerHeight && rect.bottom > 0;
// }

// // Fonction appelée lors du scroll
// function showOnScroll() {
//   const divs = document.querySelectorAll(".maDiv");
//   divs.forEach((div) => {
//     if (isInViewport(div) && div.classList.contains("opacity-0")) {
//       // Anime l'apparition
//       div.classList.remove("opacity-0", "translate-x-[-50px]", "translate-y-4");
//       div.classList.add("opacity-100", "translate-x-0", "translate-y-0");
//     }
//   });
// }

// // Écoute le scroll
// window.addEventListener("scroll", showOnScroll);
// // Vérifie aussi au chargement
// window.addEventListener("load", showOnScroll);

// Vérifie si l'élément est dans la fenêtre
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Fonction appelée lors du scroll
function showOnScroll() {
  document.querySelectorAll(".maDiv").forEach(function (div) {
    if (isInViewport(div) && div.classList.contains("opacity-0")) {
      // Anime l'apparition
      div.style.opacity = "1";
      div.style.transform = "translateX(0) translateY(0)";
    }
  });
}

// Écoute le scroll
window.addEventListener("scroll", showOnScroll);
// Vérifie aussi au chargement
window.addEventListener("load", showOnScroll);
