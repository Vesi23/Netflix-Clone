import { API_KEY } from '../common/constants.js';
import { BASE_URL } from '../common/constants.js';


export async function getPopularMovies() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results;
}


export async function searchMovies(query) {
    const respons = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
    const data = await respons.json();
    return data.results;
}

export async function getMoviesDetails(movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    return await response.json();
}


export async function getMovieVideos(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data.results;
}

export async function getMovieCredits(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data.cast.slice(0, 6);
}