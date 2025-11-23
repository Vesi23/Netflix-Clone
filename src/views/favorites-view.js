import { getFavorites } from "../data/favorites.js";
import { renderMovieCard } from "./movieDetails.js";


export async function renderFavorites() {
    const movies = await getFavorites();
    const container = document.createElement('div');
    container.classList.add('movie-grid');
    if (movies.length === 0) {
        container.innerHTML = `<p>You have no favorite movies yet.</p>`;
        return container;
    } else {
        movies.forEach(movie => container.appendChild(renderMovieCard(movie)));
    }
    const handler = (event) => {
        const { movieId, added } = event.detail || [];
        if (movieId === null) return;
        if (!added) {
            const card = container.querySelector(`[data-movie-id='${movieId}']`);
            if (card) {
                card.remove();
            }
            if (!container.querySelector('.movie')) {
                container.innerHTML = `<p>You have no favorite movies yet.</p>`;
            }
        } else {
            if (container.textContent.includes('You have no favorite movies yet.')) {
                container.innerHTML = '';
            }
            const favs = getFavorites();
            const movie = favs.find(m => m.id === movieId);
            if (movie && !container.querySelector(`[data-movie-id='${movieId}']`)) {
                container.appendChild(renderMovieCard(movie));

            }
        }
    }
    document.addEventListener('favoriteChanged', handler);
    return container;
}