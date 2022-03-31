let squares = document.querySelectorAll(".square");
let shieldDiv = document.getElementById("shield");
let healthDiv = document.getElementById("health");
let xpDiv = document.getElementById("xp");

let lastCard = null;
let shield = 0;
let health = 11;
let xp = 0;

const cards = [
    {name: "Dragon", img: "img/dragon.png", chance: 0.1},
    {name: "Heal", img: "img/heal.png", chance: 0.3},
    {name: "Goblin", img: "img/goblin.png", chance: 0.6},
    {name: "Shield", img: "img/shield.png", chance: 1},
]

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

updateStats();
function updateStats() {
    shieldDiv.innerHTML = 'Shield: ' + shield;
    healthDiv.innerHTML = 'Health: ' + health;
    xpDiv.innerHTML = 'Xp: ' + xp;
}

function resetCards() {
    // remove used class
    squares.forEach(function(square) {
        square.classList.remove("used");
    });
}

function heal(heal) {
    health += heal;
    if (health > 21) {
        health = 11;
    }
    updateStats();
}

function setShield(shield) {
    this.shield = shield;
    updateStats();
}

function nextRound() {
    //foreach square
    squares.forEach(function(square) {
        let random = Math.random();
        // Select random card from cards with the given chance
        let card = cards.find(function(card) {
            return random < card.chance;
        });
        square.classList.add(card.name);
        // Set the square's innerHTML to the card's img
        square.innerHTML = `
            <img src="${card.img}">
            <div class="stats top">0</div><div class="stats bottom">0</div>
        `;
        // Get Stat fields and set them to 0
        let statFields = square.querySelectorAll(".stats");
        let stat = 0
        if (card.name === "Shield") {
            stat = randomIntFromInterval(3, 10);
        } else if (card.name === "Heal") {
            stat = randomIntFromInterval(2, 11);
        } else if (card.name === "Goblin") {
            stat = randomIntFromInterval(4, 10);
        } else if (card.name === "Dragon") {
            stat = "21";
        }
        statFields.forEach(function(statField) {
            statField.innerHTML = stat;
        });
    });
}

// foreach squares
squares.forEach(function(square) {
    square.addEventListener("click", function() {
        // change color
        square.classList.add("used");
    });
});

reset();
function reset() {
    // start game
    resetCards();
    nextRound();
}