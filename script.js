// Messages to show when the cat is clicked (edit these however you want)
const catClickSteps = [
    { title: "Click the cat to see more", final: "So... I've ignored you for this surprise 🤭" },
    { title: "Click the cat to see more", final: "See, I don't know your address..." },
    { title: "Click the cat to see more", final: "You're also out of town" },
    { title: "Click the cat to see more", final: "But I still want something SPECIAL for my man 💡" },
    { title: "Click the cat to see more", final: "Even if it's to frustrate you 😈" },
    { title: "Click the cat to see more", final: "SOOOO, today is Feb 1 4 and I think ur the 1 4 me" },
    { title: "Click the cat to see more", final: "Happy Valentine's day bb 💘💘💘" },
    { title: "Click the cat to see more", final: "P.S. Pls don't revenge I'm too fragile for that" },
    { title: "", final: "" },
];

let catClickIndex = 0;

// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const spotify = document.getElementById("spotify");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("click", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Click the cat to see more"

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";

    // Ensure cat is visible and Spotify is hidden when we enter the YES state
    if (catImg) catImg.style.display = "block";
    if (spotify) spotify.style.display = "none";

    // Reset the sequence each time YES is clicked
    catClickIndex = 0;

    // Click the cat to cycle through messages
    if (catImg) {
        catImg.style.cursor = "pointer";
        catImg.title = "Click me!";

        // Only attach this listener once (so it doesn't stack if YES is clicked again)
        if (!catImg.dataset.catListenerAttached) {
            catImg.dataset.catListenerAttached = "true";

            catImg.addEventListener("click", () => {
                // If we've already finished the slides, do nothing
                if (catClickIndex >= catClickSteps.length) return;

                const step = catClickSteps[catClickIndex];

                if (title && step.title) title.textContent = step.title;
                if (finalText && step.final !== undefined) finalText.textContent = step.final;

                catClickIndex += 1;

                // After the LAST slide has been shown, replace the cat with Spotify
                if (catClickIndex >= catClickSteps.length) {
                    // Remove the "Click the cat..." header text
                    if (title) title.textContent = "FOR YOU 🎶";

                    // Swap cat -> Spotify
                    if (catImg) catImg.style.display = "none";
                    if (spotify) spotify.style.display = "block";
                }
            });
        }

        // Optional: immediately set the first message when YES is clicked
        // (comment these 2 lines out if you only want changes on cat clicks)
        const first = catClickSteps[0];
        if (title && first.title) title.textContent = first.title;
        if (finalText && first.final !== undefined) finalText.textContent = first.final;
    }
});
