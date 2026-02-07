// js/theme.js

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Aplica o tema salvo ao carregar a página
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        if(toggleBtn) toggleBtn.innerText = "☀️";
    }

    // Função de clique
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            let theme = "light";
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
                toggleBtn.innerText = "☀️";
            } else {
                toggleBtn.innerText = "🌙";
            }
            
            // Salva na memória do navegador
            localStorage.setItem("theme", theme);
        });
    }
});