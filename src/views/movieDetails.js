import { IMG_URL } from "../common/constants.js";
// трябва да добавя още нещо .... 
import { isFavorite } from "../data/favorites.js";
import { renderMoviePage } from "./moviePage.js";

export function renderMovieCard(movie) {
    const div = document.createElement("div");
    div.classList.add("movie-card");
    div.dataset.movieId = movie.id;
    div.innerHTML = `
    <img src="${IMG_URL + movie.poster_path}" alt="${movie.title} Poster" class="movie-poster"/>
    <div class = "title-row">
    <h3 class="movie-title">${movie.title}</h3>
    <button id="like-btn">${isFavorite(movie.id) ? "❤️" : "🤍"}</button>
    </div>`;
    div.querySelector(".movie-poster").addEventListener("click", () => renderMoviePage(movie.id));

    return div;
}