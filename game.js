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
        }, 500)
    });
}

const grid = document.querySelector(".gameGrid");
const cardsInGame = 6;
let cardsList = [];
let attempts = 0;
let foundCards = 0;

let chosenCards = [];
let chosenCardsIds = [];

let startTime = null;
let timerInterval = null;
const timerDisplay = document.getElementById("timer");

function initiateBoard() {
    for (let i = 0; i < cardsList.length; i++) {
        let card = document.createElement("img");
        card.setAttribute("src", "images/card-backside.jpg");
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
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
    if (chosenCards.length === 2) return;

    if (!startTime) {
        startTimer();
    }

    let cardId = this.getAttribute("data-id");
    if (!chosenCardsIds.includes(cardId)) {
        chosenCards.push(cardsList[cardId]);
        chosenCardsIds.push(cardId);
        this.setAttribute("src", "images/" + cardsList[cardId]);
        let cardFlipCount = 0;
        cardFlipCount++;
        console.log("Card flipped. Total flips:", cardFlipCount);

        if (chosenCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    attempts++;
    let cards = document.querySelectorAll("img");
    const [firstId, secondId] = chosenCardsIds;

    if (chosenCards[0] === chosenCards[1]) {
        foundCards++;
        cards[firstId].removeEventListener("click", flipCard);
        cards[secondId].removeEventListener("click", flipCard);
    } else {
        cards[firstId].setAttribute("src", "images/card-backside.jpg");
        cards[secondId].setAttribute("src", "images/card-backside.jpg");
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
