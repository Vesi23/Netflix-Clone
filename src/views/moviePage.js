import { getMovieVideos, getMoviesDetails, getMovieCredits } from "../requests/api.js";
import { IMG_URL, YT_BASE } from "../common/constants.js";
import { toggleFavorite, isFavorite } from "../data/favorites.js";
import { renderHome } from "./home.js";


export async function renderMoviePage(movieId) {
    const app = document.getElementById("app");
    app.innerHTML = '<p class="loading">Loading...</p>';

    const movie = await getMoviesDetails(movieId);
    const video = await getMovieVideos(movieId);
    const cast = await getMovieCredits(movieId);
    const trailer = video.find(video => video.type === "Trailer");


    const container = document.createElement("div");
    container.classList.add("movie-page");
    container.innerHTML = `
    <div class="movie-hero" style="background-image: url('${IMG_URL + movie.backdrop_path}')">
    <div class = "overlay"></div>
    <div class = "movie-content">
    <h1 class="movie-title">${movie.title}</h1>
    <p class="movie-tagline">${movie.tagline || ''}</p>
    <p class ="movie-overview">${movie.overview}</p>
    <button class="like-button">Like ❤️</button>
    <button class ="back-button">← Back to Home</button>
    </div>
    </div>
        <div class = "movie-extra">
        <h2>Trailer</h2>
        ${trailer
            ? `<div class="trailer-container" data-key="${trailer.key}"><button class="load-trailer">Load trailer ▶️</button></div>`
            : `<p>No trailer available 😢</p>`
        }
        <h2>Cast</h2>
      <div class="cast-grid">
        ${cast
            .map(
                (actor) => `
            <div class="actor-card">
              ${actor.profile_path ? `<img src="${IMG_URL + actor.profile_path}" alt="${actor.name}"/>` : ''}
              <p><strong>${actor.name}</strong><br><small>${actor.character}</small></p>
            </div>
          `
            )
            .join('')}
        </div>
        `;
    app.innerHTML = '';
    app.appendChild(container);
    container.querySelector('.back-button').addEventListener("click", async () => {
        app.innerHTML = '';
        app.appendChild(await renderHome());
    })
    const trailerContainer = container.querySelector(".load-trailer");
    if (trailerContainer) {
        trailerContainer.addEventListener('click', (e) => {
            const parent = e.target.closest('.trailer-container');
            const key = parent && parent.dataset && parent.dataset.key;
            if (!key) return;
            const iframe = document.createElement('iframe');
            iframe.width = "100%";
            iframe.height = "500";
            iframe.src = `${YT_BASE + key}`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute("loading", "lazy");
            parent.innerHTML = '';
            parent.appendChild(iframe);
        }, { once: true });
    }

}