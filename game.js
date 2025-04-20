const cardsList = [
    'bird2.jpg', 'bird2.jpg', 'cat.jpg', 'cat.jpg', 'parrot.jpg', 'parrot.jpg',
    'ostrich.avif', 'ostrich.avif', 'squirrel.jpg', 'squirrel.jpg', 'turtle.jpg', 'turtle.jpg'  
];
cardsList.sort(() => 0.5 - Math.random());

const grid = document.querySelector(".gameGrid");
const cardsInGame = 6;
attempts = 0;
foundCards = 0;

let chosenCards = [];
let chosenCardsIds = [];

function initiateBoard() {
    for (let i = 0; i < cardsList.length; i++) {
        card.setAttribute("src", "images/card-backside.jpg");
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    }
}