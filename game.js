function fetchCards() {
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

function initiateBoard() {
    for (let i = 0; i < cardsList.length; i++) {
        let card = document.createElement("img");
        card.setAttribute("src", "images/card-backside.jpg");
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    }
}

function flipCard() {
    if (chosenCards.length === 2) return;

    let cardId = this.getAttribute("data-id");
    if (!chosenCardsIds.includes(cardId)) {
        chosenCards.push(cardsList[cardId]);
        chosenCardsIds.push(cardId);
        this.setAttribute("src", "images/" + cardsList[cardId]);

        if (chosenCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    attempts++;
    let cards = document.querySelectorAll("img");
    let firstCard = chosenCardsIds[0]; 
    let secondCard = chosenCardsIds[1];

    if (cardsList[chosenCards[0]] === cardsList[chosenCards[1]]) {
        foundCards++;
        cards[firstCard].removeEventListener("click", flipCard);
        cards[secondCard].removeEventListener("click", flipCard);
    } else {
        cards[firstCard].setAttribute("src", "images/card-backside.jpg");
        cards[secondCard].setAttribute("src", "images/card-backside.jpg");
    }

    chosenCards = [];
    chosenCardsIds = [];

    if (foundCards === cardsInGame) {
        alert("You matched them all! 🎉");
    }
}

    fetchCards()
    .then((cards) => {
        cardsList = cards;
        initiateBoard();
    })
    .catch((error) => {
        console.error("Couldn't load cards:", error);
    });

    function resetGame() {
        grid.innerHTML = '';
        attempts = 0;
        foundCards = 0;
        chosenCards = [];
        chosenCardsIds = [];
    
        fetchCards()
            .then((cards) => {
                cardsList = cards;
                initiateBoard();
            })
            .catch((error) => {
                console.error("Couldn't reset game:", error);
            });
    }

document.getElementById("button").addEventListener("click", resetGame);
