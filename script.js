document.addEventListener("DOMContentLoaded", () => {

```
/*
=========================================================
PLUGGLY
Global JavaScript
=========================================================
*/

initNavigation();
initSubjectLinks();
initStudyLinks();
initProgress();
initQuickActions();
initSearch();
initButtons();
initScrollReveal();
```

});

# /*

# NAVIGATION

*/

function initNavigation() {

```
const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

const navLinks =
    document.querySelectorAll(".navbar nav a");

navLinks.forEach(link => {

    const href =
        link.getAttribute("href");

    if (!href) return;

    const linkPage =
        href.split("#")[0]
            .split("?")[0]
            .toLowerCase();

    if (
        linkPage &&
        linkPage === currentPage
    ) {
        link.classList.add("active");
    }

});
```

}

# /*

# SUBJECT LINKS

*/

function initSubjectLinks() {

```
const subjectCards =
    document.querySelectorAll(
        ".subject-card"
    );

subjectCards.forEach(card => {

    card.addEventListener("click", event => {

        /*
        If the card already contains an <a>,
        let the normal browser navigation handle it.
        */

        if (
            event.target.closest("a")
        ) {
            return;
        }

        const subject =
            card.dataset.subject;

        if (!subject) return;

        window.location.href =
            `study.html?subject=${encodeURIComponent(subject)}`;

    });

});
```

}

# /*

# STUDY PAGE LINKS

*/

function initStudyLinks() {

```
const params =
    new URLSearchParams(
        window.location.search
    );

const subject =
    params.get("subject");

if (!subject) return;


/*
Update links that should keep
the current subject.
*/

const subjectLinks =
    document.querySelectorAll(
        "[data-keep-subject]"
    );

subjectLinks.forEach(link => {

    const href =
        link.getAttribute("href");

    if (!href) return;

    const separator =
        href.includes("?")
            ? "&"
            : "?";

    link.href =
        `${href}${separator}subject=${encodeURIComponent(subject)}`;

});


/*
Standard study-page buttons.
*/

const quizLink =
    document.getElementById("quiz-link");

if (quizLink) {

    quizLink.href =
        `quiz.html?subject=${encodeURIComponent(subject)}`;

}


const flashcardsLink =
    document.getElementById(
        "flashcards-link"
    );

if (flashcardsLink) {

    flashcardsLink.href =
        `flashcards.html?subject=${encodeURIComponent(subject)}`;

}


const testLink =
    document.getElementById("test-link");

if (testLink) {

    testLink.href =
        `quiz.html?subject=${encodeURIComponent(subject)}&mode=test`;

}
```

}

# /*

# PROGRESS

*/

function initProgress() {

```
const progress =
    Number(
        localStorage.getItem(
            "plugglyProgress"
        )
    ) || 0;


/*
Generic progress elements
*/

document
    .querySelectorAll(
        ".progress-fill"
    )
    .forEach(fill => {

        /*
        Don't overwrite chapter-specific
        progress that is already explicitly set.
        */

        if (
            fill.dataset.manual !== "true"
        ) {
            fill.style.width =
                `${Math.min(progress, 100)}%`;
        }

    });


/*
Overall progress number
*/

const overallProgress =
    document.getElementById(
        "overall-progress"
    );

if (overallProgress) {

    overallProgress.textContent =
        `${progress}%`;

}


/*
Overall progress bar
*/

const overallFill =
    document.getElementById(
        "overall-progress-fill"
    );

if (overallFill) {

    overallFill.style.width =
        `${progress}%`;

}


/*
Progress message
*/

const progressNote =
    document.querySelector(
        ".progress-note"
    );

if (progressNote) {

    if (progress === 0) {

        progressNote.textContent =
            "Börja din första lektion";

    } else if (progress < 100) {

        progressNote.textContent =
            "Fortsätt där du slutade";

    } else {

        progressNote.textContent =
            "Du är klar! 🎉";

    }

}
```

}

# /*

# INCREASE PROGRESS

*/

function increaseProgress(amount = 5) {

```
let progress =
    Number(
        localStorage.getItem(
            "plugglyProgress"
        )
    ) || 0;


progress =
    Math.min(
        100,
        progress + amount
    );


localStorage.setItem(
    "plugglyProgress",
    progress
);


updateProgress(progress);

return progress;
```

}

# /*

# UPDATE PROGRESS

*/

function updateProgress(progress) {

```
document
    .querySelectorAll(
        ".progress-fill"
    )
    .forEach(fill => {

        if (
            fill.dataset.manual !== "true"
        ) {
            fill.style.width =
                `${progress}%`;
        }

    });


const overallProgress =
    document.getElementById(
        "overall-progress"
    );

if (overallProgress) {

    overallProgress.textContent =
        `${progress}%`;

}


const overallFill =
    document.getElementById(
        "overall-progress-fill"
    );

if (overallFill) {

    overallFill.style.width =
        `${progress}%`;

}
```

}

# /*

# QUICK ACTIONS

*/

function initQuickActions() {

```
const actions =
    document.querySelectorAll(
        "[data-action]"
    );

actions.forEach(element => {

    element.addEventListener(
        "click",
        event => {

            const action =
                element.dataset.action;

            if (!action) return;


            if (
                action === "quiz"
            ) {

                event.preventDefault();

                startQuiz();

            }


            if (
                action === "flashcards"
            ) {

                event.preventDefault();

                openFlashcards();

            }


            if (
                action === "test"
            ) {

                event.preventDefault();

                startTest();

            }


            if (
                action === "weaknesses"
            ) {

                event.preventDefault();

                practiceWeaknesses();

            }

        }
    );

});
```

}

# /*

# SEARCH

*/

function initSearch() {

```
const searchInputs =
    document.querySelectorAll(
        "[data-search], .search"
    );

searchInputs.forEach(input => {

    input.addEventListener(
        "input",
        () => {

            const query =
                input.value
                    .trim()
                    .toLowerCase();


            const searchableItems =
                document.querySelectorAll(
                    "[data-searchable]"
                );


            searchableItems.forEach(item => {

                const text =
                    item.textContent
                        .toLowerCase();


                if (
                    !query ||
                    text.includes(query)
                ) {

                    item.style.display =
                        "";

                } else {

                    item.style.display =
                        "none";

                }

            });

        }
    );

});
```

}

# /*

# BUTTONS

*/

function initButtons() {

```
/*
Only handle buttons that explicitly
have a data-action.

Normal <a href=""> links are left alone.
*/

const buttons =
    document.querySelectorAll(
        "button[data-action]"
    );

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const action =
                button.dataset.action;


            switch (action) {

                case "quiz":
                    startQuiz();
                    break;

                case "flashcards":
                    openFlashcards();
                    break;

                case "test":
                    startTest();
                    break;

                case "weaknesses":
                    practiceWeaknesses();
                    break;

                case "progress":
                    increaseProgress();
                    break;

            }

        }
    );

});
```

}

# /*

# STUDY ACTIONS

*/

function openStudyView(subject = null) {

```
if (!subject) {

    subject =
        localStorage.getItem(
            "plugglySubject"
        ) || "matematik";

}


localStorage.setItem(
    "plugglySubject",
    subject
);


window.location.href =
    `study.html?subject=${encodeURIComponent(subject)}`;
```

}

# /*

# QUIZ

*/

function startQuiz() {

```
const subject =
    getCurrentSubject();

localStorage.setItem(
    "plugglySubject",
    subject
);


window.location.href =
    `quiz.html?subject=${encodeURIComponent(subject)}`;
```

}

# /*

# FLASHCARDS

*/

function openFlashcards() {

```
const subject =
    getCurrentSubject();

localStorage.setItem(
    "plugglySubject",
    subject
);


window.location.href =
    `flashcards.html?subject=${encodeURIComponent(subject)}`;
```

}

# /*

# TEST

*/

function startTest() {

```
const subject =
    getCurrentSubject();

localStorage.setItem(
    "plugglySubject",
    subject
);


window.location.href =
    `quiz.html?subject=${encodeURIComponent(subject)}&mode=test`;
```

}

# /*

# WEAKNESSES

*/

function practiceWeaknesses() {

```
showToast(
    "Din svaghetsträning kommer snart."
);
```

}

# /*

# CURRENT SUBJECT

*/

function getCurrentSubject() {

```
const params =
    new URLSearchParams(
        window.location.search
    );


return (
    params.get("subject") ||
    localStorage.getItem(
        "plugglySubject"
    ) ||
    "matematik"
);
```

}

# /*

# QUIZ SCORE

*/

function saveQuizScore(score, total) {

```
localStorage.setItem(
    "plugglyLastScore",
    JSON.stringify({
        score: score,
        total: total,
        date: Date.now()
    })
);


/*
Small progress increase after completing
a quiz successfully.
*/

if (
    total > 0 &&
    score / total >= 0.6
) {

    increaseProgress(5);

}
```

}

# /*

# TOAST

*/

function showToast(message) {

```
let toast =
    document.querySelector(".toast");


if (!toast) {

    toast =
        document.createElement("div");

    toast.className =
        "toast";

    document.body.appendChild(
        toast
    );

}


toast.textContent =
    message;

toast.classList.add(
    "show"
);


clearTimeout(
    toast._timeout
);


toast._timeout =
    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);
```

}

# /*

# SCROLL REVEAL

*/

function initScrollReveal() {

```
const elements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    !elements.length
) {
    return;
}


/*
Fallback for browsers without
IntersectionObserver.
*/

if (
    !("IntersectionObserver" in window)
) {

    elements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

    return;

}


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


elements.forEach(element => {

    observer.observe(
        element
    );

});
```

}

# /*

# PLUGGLY GLOBAL API

*/

window.Pluggly = {

```
startQuiz,
openFlashcards,
startTest,
practiceWeaknesses,

openStudyView,

increaseProgress,
updateProgress,

saveQuizScore,

showToast,

getCurrentSubject
```

};
