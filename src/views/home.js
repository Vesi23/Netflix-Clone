import { getPopularMovies } from "../requests/api.js";
import { renderMovieCard } from "./movieDetails.js";
// import { renderStartingView } from "./starting-view.js";

export async function renderHome() {
  try {
    const movies = await getPopularMovies();
    const container = document.createElement("div");
    container.classList.add("add-movie-grid");
    (movies || []).forEach((movie) =>
      container.appendChild(renderMovieCard(movie))
    );
    return container;
  } catch (error) {
    const container = document.createElement("div");
    container.classList.add("error");
    container.textContent = "Failed to  movies";
    console.error("renderHome error:", error);
    return container;
  }
}
