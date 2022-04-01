let squares = document.querySelectorAll(".square");
let shieldDiv = document.getElementById("shield");
let healthDiv = document.getElementById("health");
let xpDiv = document.getElementById("xp");

let lastDamage = null;
let lastCard = null;
let shield = 0;
let health = 11;
let xp = 0;

const cards = [
    {name: "Dragon", img: "img/dragon.png", chance: 0.1},
    {name: "Heal", img: "img/heal.png", chance: 0.3},
    {name: "Goblin", img: "img/goblin.png", chance: 0.5},
    {name: "Shield", img: "img/shield.png", chance: 1},
]

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

updateStats();
function updateStats() {
    shieldDiv.innerHTML = 'Shield: <div>' + shield + '' + (lastDamage!=null? ' (' + lastDamage + ')</div>' : '</div>');
    healthDiv.innerHTML = 'Health: <div>' + health + '</div>';
    xpDiv.innerHTML = 'Xp: <div>' + xp + '</div>';
    if (health <= 0) {
        alert("You lost!");
        reset();
    }
}

function resetCards() {
    // remove used class
    console.log("Reset cards");
    squares.forEach(function(square) {
        square.classList.remove("Dragon", "Heal", "Goblin", "Shield", "used");
        square.replaceWith(square.cloneNode(true));
    });
}

function heal(heal) {
    if (lastCard != null)
        if (lastCard.name == "Heal") 
            return
    health = health + heal;
    if (health > 21)
        health = 21
    updateStats();
}

function damage(damage) {
    let db = damage
    if (shield > 0) {
        if (lastDamage == null) {
            console.log("Shield is active and LastDamage is null");
            damage = damage - shield;
            if (damage < 0)
                damage = 0;
        } else {
            console.log("Shield is active and LastDamage is not null", damage, lastDamage);
            if (damage <= lastDamage)  {
                console.log("Damage is less than lastDamage");
                damage = damage - shield;
                if (damage < 0)
                    damage = 0;
            }
        }
    }
    console.log(damage);
    if (shield > 0)
        lastDamage = db;
    health = health - damage;
    updateStats();
}

function nextRound() {
    //foreach square
    squares = document.querySelectorAll(".square");
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
            stat = randomIntFromInterval(2, 6);
        } else if (card.name === "Dragon") {
            stat = "21";
        }
        statFields.forEach(function(statField) {
            statField.innerHTML = stat;
        });
        square.addEventListener("click", function() {
            // change color
            console.log(card.name)
            if (square.classList.contains("used"))
                return
            square.classList.add("used");
            if (card.name === "Shield") {
                shield = stat;
                lastDamage = null;
                updateStats();
            } else if (card.name === "Heal") {
                heal(stat);
            } else if (card.name === "Goblin" || card.name === "Dragon") {
                console.log("Card is Goblin or Dragon");
                damage(stat);
            }
            lastCard = card;
            let usedSquares = document.querySelectorAll(".used");
            if (usedSquares.length === squares.length) {
                // Wait 0.2 seconds and reset
                setTimeout(reset, 200);
            }
        });
    });
}

reset();
function reset() {
    // start game
    resetCards();
    nextRound();
}