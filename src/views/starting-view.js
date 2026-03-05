import { renderHome } from "./home.js";
import { renderAbout } from "./about.js";
// import {header} from "../common/header.js";

export async function renderStartingView() {
  const div = document.createElement("div");
  // div.classList.add("start-page");
  div.innerHTML = `
    <div class="start-page-overlay"></div>
    <div class="start-page-content">
      <h1 class="start-page-title">Welcome to Netflix Clone</h1>
      <p class="start-page-subtitle">Discover popular movies, search for your favorite, and explore detailed information about each movie.</p>
      <div class="start-page-buttons">
      <button id="home-button">Go to Home</button>
      <button id="learn-more-button">Learn More</button>
      </div>
    </div>
  `;
  const header = document.querySelector("header");
  if (header) {
    header.style.display = "none";
  }
  const homeButton = div.querySelector("#home-button");
  if (homeButton) {
    homeButton.addEventListener("click", async () => {
      if (header) header.style.display = "flex";
      const homeView = await renderHome();
      const parent = div.parentElement || document.body;
      parent.innerHTML = "";
      parent.appendChild(homeView);
    });
  }

  const learnMoreButton = div.querySelector("#learn-more-button");
  learnMoreButton.addEventListener("click", async () => {
    if(header) header.style.display = "flex";
    const aboutView = renderAbout();
    const parent = div.parentElement || document.body;
    parent.innerHTML = "";
    parent.appendChild(aboutView);
  });

  return div;
}
