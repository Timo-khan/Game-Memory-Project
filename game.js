function fetchCards() {
    return new Promise((resolve) => {
        setTimeout (() => {
            
        })
    })
}

const grid = document.querySelector(".gameGrid");
const cardsInGame = 6;
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
    if (chosenCards.length != 2) {
        let cardId = this.getAttribute("data-id");
        if (this.getAttribute("src") !== "images/") {
            chosenCards.push(cardId);
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

    const resetButton = document.querySelector("#button");  
    resetButton.addEventListener("click", resetGame);

    function resetGame() {
        grid.innerHTML = '';

        attempts = 0;
        foundCards = 0;
        chosenCards = [];
        chosenCardsIds = [];
        cardsList.sort(() => 0.5 - Math.random());
        initiateBoard();
    }
}

initiateBoard();