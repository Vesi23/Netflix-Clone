export function renderAbout() {
    const div = document.createElement("div");
    div.classList.add("about-container");
    div.innerHTML = `
    <h1>About This Project</h1>
    <p>This project is a Netflix clone built using vanilla JavaScript, HTML, and CSS. It utilizes The Movie Database (TMDb) API to fetch and display movie data, including popular movies, search functionality, movie details, trailers, and cast information.</p>
    `
    return div;
}