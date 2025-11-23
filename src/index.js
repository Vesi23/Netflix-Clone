// import { renderFavorites } from './views/favorites.js';
import { renderHome } from './views/home.js';
import { renderAbout } from './views/about.js';
import { renderFavorites } from './views/favorites-view.js';
import { handlerSearch } from './events/searchHandler.js';

const app = document.getElementById('app');
const homeBtn = document.getElementById('home-btn');
const favoritesBtn = document.getElementById('favorites-btn');
const aboutBtn = document.getElementById('about-btn');
const searchInput = document.getElementById('search');

async function loadView(view) {
    app.innerHTML = '';
    try {
        const node = await view();
        app.appendChild(node);
    } catch (error) {
        app.innerHTML = '';
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        errorDiv.textContent = 'Failed to load content';
        app.appendChild(errorDiv);
        console.error('loadView error:', error);
    }
}
homeBtn.addEventListener('click', () => loadView(renderHome));
// favoritesBtn.addEventListener('click', () => loadView(renderFavorites));
aboutBtn.addEventListener('click', () => loadView(renderAbout));
favoritesBtn.addEventListener("click", () => loadView(renderFavorites));

loadView(renderHome);
searchInput.addEventListener('keyup' , async (event)=>{
    if(event.key === "Enter" && searchInput.value.trim() !== "") {
        app.innerHTML = '';
        app.appendChild( await handlerSearch(event.target.value.trim()));
    }
})