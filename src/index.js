// import { renderFavorites } from './views/favorites.js';
import { renderHome } from "./views/home.js";
import { renderAbout } from "./views/about.js";
import { renderFavorites } from "./views/favorites-view.js";
import { handlerSearch } from "./events/searchHandler.js";
import { renderStartingView } from "./views/starting-view.js";

const app = document.getElementById("app");
const header = document.getElementById("header");
const homeBtn = document.getElementById("home-btn");
const favoritesBtn = document.getElementById("favorites-btn");
const aboutBtn = document.getElementById("about-btn");
const searchInput = document.getElementById("search");

export async function loadView(view) {
  if (view === renderStartingView) {
    if (header) header.style.display = "none";
  } else {
    if (header) header.style.display = "flex";
  }
  app.innerHTML = "";
  try {
    const node = await view();
    app.appendChild(node);
  } catch (error) {
    app.innerHTML = "";
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    errorDiv.textContent = "Failed to load content";
    app.appendChild(errorDiv);
    console.error("loadView error:", error);
  }
}
homeBtn.addEventListener("click", () => loadView(renderHome));
// favoritesBtn.addEventListener('click', () => loadView(renderFavorites));
aboutBtn.addEventListener("click", () => loadView(renderAbout));
favoritesBtn.addEventListener("click", () => loadView(renderFavorites));

loadView(renderStartingView);
searchInput.addEventListener("keyup", async (event) => {
  if (event.key === "Enter" && searchInput.value.trim() !== "") {
    app.innerHTML = "";
    app.appendChild(await handlerSearch(event.target.value.trim()));
  }
});
