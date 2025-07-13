async function fetchCards() {
    return new Promise((resolve) => {
        setTimeout (() => {
            const images = [
                'bird2.jpg', 'bird2.jpg', 'cat.jpg', 'cat.jpg',
                'parrot.jpg', 'parrot.jpg', 'ostrich.avif', 'ostrich.avif',
                'squirrel.jpg', 'squirrel.jpg', 'turtle.jpg', 'turtle.jpg'
            ];

            const randomized = images.sort(() => 0.5 - Math.random());
            resolve(randomized);
        }, 500);
    });
}

const grid = document.querySelector(".gameGrid");
const flipCounterDisplay = document.getElementById("flip-counter");
const cardsInGame = 6;
let cardsList = [];
let attempts = 0;
let foundCards = 0;
let cardFlipCount = 0;

let chosenCards = [];
let chosenCardsIds = [];
let isChecking = false;

let startTime = null;
let timerInterval = null;
const timerDisplay = document.getElementById("timer");


function initiateBoard() {
    for (let i = 0; i < cardsList.length; i++) {
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("memory-card");
        cardWrapper.setAttribute("data-id", i);

        const frontFace = document.createElement("img");
        frontFace.classList.add("front-face");
        frontFace.setAttribute("src", "images/" + cardsList[i]);

        const backFace = document.createElement("img");
        backFace.classList.add("back-face");
        backFace.setAttribute("src", "images/card-backside.jpg");

        cardWrapper.appendChild(frontFace);
        cardWrapper.appendChild(backFace);
        cardWrapper.addEventListener("click", flipCard);

        grid.appendChild(cardWrapper);
    }
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = `Time: ${elapsed}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function flipCard() {
    if (isChecking || this.classList.contains("flipped") || chosenCards.length === 2) return;

    const cardId = parseInt(this.getAttribute("data-id"));

    if (!chosenCardsIds.includes(cardId)) {
        this.classList.add("flipped");

        chosenCards.push(cardsList[cardId]);
        chosenCardsIds.push(cardId);
        cardFlipCount++;
        flipCounterDisplay.textContent = `Flips: ${cardFlipCount}`;

    if (!startTime) {
        startTimer();
    }

        if (chosenCards.length === 2) {
            isChecking = true;
            setTimeout(() => {
                checkForMatch();
                isChecking = false;
            }, 600);
        } 
    }
}

function checkForMatch() {
    const firstId = chosenCardsIds[0];
    const secondId = chosenCardsIds[1];

    const firstCard = document.querySelector(`.memory-card[data-id='${firstId}']`);
    const secondCard = document.querySelector(`.memory-card[data-id='${secondId}']`);
    

    if (chosenCards[0] === chosenCards[1]) {
        foundCards++;
        setTimeout(() => {
        firstCard.remove();
        secondCard.remove();
        }, 300);
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
        }, 300);
    }

    chosenCards = [];
    chosenCardsIds = [];

    if (foundCards === cardsInGame) {
        stopTimer();
        setTimeout(() => {
            alert("You matched them all! 🎉");
            resetGame(); 
        }, 500); 
    }
}


    (async function() {
        try {
            const cards = await fetchCards();
            cardsList = cards;
            initiateBoard();
        } catch (error) {
        console.error("couldn't load cards:", error);
        }
    })();

    async function resetGame() {
        grid.innerHTML = '';
        cardFlipCount = 0;
        flipCounterDisplay.textContent = "Flips: 0";
        attempts = 0;
        foundCards = 0;
        chosenCards = [];
        chosenCardsIds = [];
        startTime = null;
        timerDisplay.textContent = "Time: 0s";
        stopTimer();
    
        try {
            const cards = await fetchCards();
            cardsList = cards;
            initiateBoard();
        } catch (error) {
            console.error("Couldn't reset game:", error);
        }
    }

document.getElementById("button").addEventListener("click", resetGame);
