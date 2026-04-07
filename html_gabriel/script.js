const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const cursorGlow = document.querySelector(".cursor-glow");
const revealItems = document.querySelectorAll("[data-reveal]");
const themeToggleText = document.querySelector(".theme-toggle-text");

const savedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (savedTheme === "light" || (!savedTheme && prefersLight)) {
    body.classList.add("light-mode");
}

const updateThemeLabel = () => {
    const isLight = body.classList.contains("light-mode");
    themeToggleBtn.setAttribute("aria-pressed", String(isLight));
    themeToggleText.textContent = isLight ? "Claro" : "Noturno";
};

updateThemeLabel();

window.addEventListener("load", () => {
    window.requestAnimationFrame(() => {
        body.classList.add("page-loaded");
    });
});

themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
    updateThemeLabel();
});

window.addEventListener("mousemove", (event) => {
    if (!cursorGlow) {
        return;
    }

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener("mouseout", () => {
    if (cursorGlow) {
        cursorGlow.style.opacity = "0";
    }
});

window.addEventListener("mouseover", () => {
    if (cursorGlow) {
        cursorGlow.style.opacity = "1";
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.16
});

revealItems.forEach((item) => observer.observe(item));
