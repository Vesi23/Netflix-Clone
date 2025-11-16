import { renderAbout } from "./views/about.js";     

// Изчакваме DOM да се зареди
document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById("app");
    const aboutBtn = document.getElementById("about-btn");

    // Проверяваме дали елементите съществуват
    if (!app) {
        console.error("Element with id 'app' not found");
        return;
    }

    if (!aboutBtn) {
        console.error("Element with id 'about-btn' not found");
        return;
    }

    async function loadView(view) {
        app.innerHTML = "";
        try {
            const node = await view();
            app.appendChild(node);
        } catch (error) {
            app.innerHTML = ``;
            const errorDiv = document.createElement("div")
            errorDiv.classList.add("error");
            errorDiv.textContent = "An error occurred while loading the view.";
            app.appendChild(errorDiv);
            console.error("Error loading view:", error);
        }
    }

    // Зареждаме началната страница
    function loadHomePage() {
        app.innerHTML = `
            <div class="home-container">
                <h2>Добре дошли в Netflix Clone</h2>
                <p>Използвайте навигацията за да разгледате различните секции.</p>
            </div>
        `;
    }

    // Event listeners
    aboutBtn.addEventListener("click", () => {
        loadView(renderAbout);
    });

    // Зареждаме началната страница
    loadHomePage();
});
