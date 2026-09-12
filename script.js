```javascript
/* =========================================
   PLUGGLY — script.js
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initSubjectCards();
    initStudyModes();
    initQuickActions();
    initSearch();
    initProgress();
    initScrollReveal();
    initButtons();
});

/* =========================================
   NAVIGATION
   ========================================= */

function initNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

/* =========================================
   SUBJECT CARDS
   ========================================= */

function initSubjectCards() {
    const subjects = document.querySelectorAll(".subject-card");

    subjects.forEach(card => {
        card.addEventListener("click", () => {
            const subjectName =
                card.querySelector(".subject-name")?.textContent ||
                card.querySelector("h3")?.textContent ||
                "Det här ämnet";

            openStudyView(subjectName);
        });
    });
}

/* =========================================
   STUDY MODES
   ========================================= */

function initStudyModes() {
    const modes = document.querySelectorAll(".mode-card");

    modes.forEach(mode => {
        mode.addEventListener("click", () => {
            const title =
                mode.querySelector("h3")?.textContent ||
                "Öva";

            if (title.toLowerCase().includes("flash")) {
                openFlashcards();
            } else if (title.toLowerCase().includes("quiz")) {
                startQuiz();
            } else if (title.toLowerCase().includes("test")) {
                startTest();
            } else {
                openStudyView("Studera");
            }
        });
    });
}

/* =========================================
   QUICK ACTIONS
   ========================================= */

function initQuickActions() {
    const actions = document.querySelectorAll(".quick-card");

    actions.forEach(action => {
        action.addEventListener("click", () => {
            const title =
                action.querySelector("h3")?.textContent ||
                action.querySelector(".quick-title")?.textContent ||
                "";

            const lowerTitle = title.toLowerCase();

            if (lowerTitle.includes("quiz")) {
                startQuiz();
            } else if (lowerTitle.includes("flash")) {
                openFlashcards();
            } else if (
                lowerTitle.includes("svag") ||
                lowerTitle.includes("weak")
            ) {
                practiceWeaknesses();
            } else {
                openStudyView(title);
            }
        });
    });
}

/* =========================================
   SEARCH
   ========================================= */

function initSearch() {
    const searchInput =
        document.querySelector("#search") ||
        document.querySelector(".search-input") ||
        document.querySelector('input[type="search"]');

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();

        const cards = document.querySelectorAll(
            ".subject-card, .mode-card, .quick-card"
        );

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();

            if (!query || text.includes(query)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

/* =========================================
   PROGRESS
   ========================================= */

function initProgress() {
    let progress = Number(
        localStorage.getItem("plugglyProgress") || 0
    );

    updateProgress(progress);

    window.addEventListener("plugglyProgressUpdate", () => {
        const newProgress = Number(
            localStorage.getItem("plugglyProgress") || 0
        );

        updateProgress(newProgress);
    });
}

function updateProgress(progress) {
    progress = Math.max(0, Math.min(100, progress));

    const progressBars = document.querySelectorAll(
        ".progress-fill, .skill-fill"
    );

    progressBars.forEach(bar => {
        if (!bar.dataset.static) {
            bar.style.width = `${progress}%`;
        }
    });

    const progressNumbers = document.querySelectorAll(
        ".progress-number, .progress-value"
    );

    progressNumbers.forEach(number => {
        number.textContent = `${progress}%`;
    });
}

function increaseProgress(amount = 5) {
    let progress = Number(
        localStorage.getItem("plugglyProgress") || 0
    );

    progress = Math.min(100, progress + amount);

    localStorage.setItem(
        "plugglyProgress",
        progress
    );

    updateProgress(progress);

    window.dispatchEvent(
        new Event("plugglyProgressUpdate")
    );
}

/* =========================================
   STUDY VIEW
   ========================================= */

function openStudyView(subject) {
    showToast(`Öppnar ${subject}...`);

    setTimeout(() => {
        showToast(`${subject} är redo att plugga 📚`);
    }, 700);
}

/* =========================================
   QUIZ
   ========================================= */

function startQuiz() {
    showToast("Startar quiz...");

    increaseProgress(2);

    setTimeout(() => {
        showToast("Quiz är redo 🧠");
    }, 700);
}

/* =========================================
   FLASHCARDS
   ========================================= */

function openFlashcards() {
    showToast("Öppnar flashcards...");

    increaseProgress(1);

    setTimeout(() => {
        showToast("Flashcards är redo 🃏");
    }, 700);
}

/* =========================================
   TEST
   ========================================= */

function startTest() {
    showToast("Förbereder test...");

    setTimeout(() => {
        showToast("Testet är redo ✏️");
    }, 700);
}

/* =========================================
   WEAKNESSES
   ========================================= */

function practiceWeaknesses() {
    showToast("Hittar områden du behöver träna på...");

    setTimeout(() => {
        showToast("Din personliga träning är redo 🎯");
    }, 900);
}

/* =========================================
   BUTTONS
   ========================================= */

function initButtons() {
    const startButtons = document.querySelectorAll(
        ".btn-primary, .hero-button"
    );

    startButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target =
                document.querySelector("#subjects") ||
                document.querySelector("#study");

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
}

/* =========================================
   SCROLL REVEAL
   ========================================= */

function initScrollReveal() {
    const elements = document.querySelectorAll(
        ".subject-card, .quick-card, .mode-card, .section-header, .practice-card"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.1
        }
    );

    elements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });
}

/* =========================================
   TOAST NOTIFICATIONS
   ========================================= */

function showToast(message) {
    let toast = document.querySelector(".pluggly-toast");

    if (!toast) {
        toast = document.createElement("div");

        toast.className = "pluggly-toast";

        document.body.appendChild(toast);

        Object.assign(toast.style, {
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%) translateY(20px)",
            padding: "12px 18px",
            background: "#111",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: "9999",
            opacity: "0",
            pointerEvents: "none",
            transition:
                "opacity .2s ease, transform .2s ease",
            boxShadow:
                "0 8px 30px rgba(0,0,0,.15)"
        });
    }

    toast.textContent = message;

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform =
            "translateX(-50%) translateY(0)";
    });

    clearTimeout(toast.hideTimer);

    toast.hideTimer = setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform =
            "translateX(-50%) translateY(20px)";
    }, 2200);
}

/* =========================================
   GLOBAL API
   ========================================= */

window.Pluggly = {
    startQuiz,
    openFlashcards,
    startTest,
    practiceWeaknesses,
    increaseProgress,
    updateProgress
};
```
