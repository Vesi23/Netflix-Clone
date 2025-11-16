import { getPopularMovies } from "../requests/api.js";
import { renderMovieCard } from "./movieDetails.js";

export async function renderHome() {
    try {
        const movies = await getPopularMovies();
        const container = document.createElement("div");
        container.classList.add("add-movie-grid");
        (movies || [].forEach(movies => container.appendChild(renderMovieCard(movies))));
        return container;
    } catch (error) {
        const container = document.createElement("div");
        container.classList.add('error');
        container.textContent = 'Failed to load movies';
        console.error('renderHome error:', error);
        return container;
    }
}