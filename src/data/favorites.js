export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function isFavorite(movieId) {
    const favorites = getFavorites();
    return favorites.some((movie) => movie.id === movieId);
}

export function toggleFavorite(movie) {
    let favorites = getFavorites();
    const exist = favorites.find((m) => m.id === movie.id);
    let added;
    if (exist) {
        favorites = favorites.filter((m) => m.id !== movie.id);
        added = false;
    } else {
        favorites.push(movie);
        added = true;
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    try {
        console.log('dispatch favoriteChanged', { movieId: movie.id, added });
        document.dispatchEvent(new CustomEvent('favoriteChanged', { detail: { movieId: movie.id, added } }));
    } catch (error) {
        console.warn('Could not dispatch favoriteChanged event :', error);
    }
    return { added };
}

