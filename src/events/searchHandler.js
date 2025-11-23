import { searchMovies } from "../requests/api.js";
import { renderMovieCard } from "../views/movieDetails.js";

export async function handlerSearch(query) {
    const search = await searchMovies(query);
    const container = document.createElement("div");
    container.classList.add("add-movie-grid");
    if (!query) {
        container.innerHTML = `<p>Please enter a search term.</p>`;
        return container;
    }
    search.forEach(movie => container.appendChild(renderMovieCard(movie)));
    return container;
}