// Global Variables

const winner = document.getElementById("show-winner");
const showHeroesBtn = document.getElementById("show-heroes");
const startFightBtn = document.getElementById("start-fight");
const heroSection = document.getElementById("hero-container");
const dwarfBtn = document.getElementById("select-dwarf");
const daemonBtn = document.getElementById("select-sprite");
const dragonBtn = document.getElementById("select-dragon");
const battleDetails = document.getElementById("battle-details");
const detailsBtn = document.getElementById("details-btn");

// Parent Class

class Hero {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
        this.canFly = false;
        this.shield = false;
    }

    attacked(damage) {
        if (this.canFly) {
            let chance = Math.random();

            if (chance > 0.5) {
                // 50% chance of flying away and no damage taken
                battleDetails.innerHTML += `<span class="text-red">${this.name} flew away.</span>`;
                damage = 0;
            }
        }

        if (this.shield) {
            damage *= 0.8; // takes only 80% of damage
            battleDetails.innerHTML += `<span class="text-red">${this.name} defends with a shield.</span>`;
        }

        this.hp -= damage;
        battleDetails.innerHTML += `<span class="text-red">${this.name} has been attacked. HP reduced by ${damage}. HP remaining: ${this.hp}.</span>`;
    }
}

// Child Classes

class Dwarf extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.shield = true;
    }

    attack(otherHero) {
        let damage = 10;
        battleDetails.innerHTML += `<span class="text-red">${this.name} attacked with damage: ${damage}.</span>`;
        otherHero.attacked(damage);
    }
}

class Daemon extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.canFly = true;
    }

    attack(otherHero) {
        let damage = 15;
        battleDetails.innerHTML += `<span class="text-red">${this.name} attacked with damage: ${damage}.</span>`;
        otherHero.attacked(damage);
    }
}

class Dragon extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.canFly = true;
        this.shield = true;
    }

    attack(otherHero) {
        let damage = 5;
        battleDetails.innerHTML += `<span class="text-red">${this.name} attacked with damage: ${damage}.</span>`;
        otherHero.attacked(damage);
    }
}

class Fight {
    constructor(hero1, hero2) {
        this.hero1 = hero1;
        this.hero2 = hero2;
        this.turn = 0;
    }

    performAttack() {
        if (this.turn === 0) {
            this.hero1.attack(this.hero2); // there are only turn 0 and turn 1. in turn 0 hero1 attacks and hero 2 attacks in turn 1
            console.log(`this turn is: ${this.turn} for hero1`);
        } else {
            this.hero2.attack(this.hero1);
            console.log(`this turn is: ${this.turn} for hero2`);
        }
    }

    changeTurn() {
        this.turn = 1 - this.turn;
    }

    findWinner() {
        let winner = "";
        if (this.hero1.hp > 0) {
            winner = `${this.hero1.name} won the battle with ${this.hero1.hp} HP left!`;
            return winner;
        } else if (this.hero2.hp > 0) {
            winner = `${this.hero2.name} won the battle with ${this.hero2.hp} HP left!`;
            return winner;
        } else {
            winner = `No heroes left alive.`;
            return winner;
        }
    }

    go() {
        do {
            this.performAttack();
            this.changeTurn();
        } while (this.hero1.hp > 0 && this.hero2.hp > 0);

        this.findWinner();
    }
}

// Heroes objects

let dwarf = new Dwarf("Thorin The Shield Breaker", 50);
let daemon = new Daemon("Skarbrand the Exiled", 40);
let dragon = new Dragon("Nozdormu The Timeless One", 60);

const epicFight = new Fight(); //dynamicaly populated with heroes later
console.log(epicFight);

// Functions

function showElements(...elements) {
    elements.forEach((element) => {
        element.classList.remove("hidden");
    });
}

function hideElements(...elements) {
    elements.forEach((element) => {
        element.classList.add("hidden");
    });
}

// Events

showHeroesBtn.addEventListener("click", function () {
    showElements(startFightBtn, heroSection);
    hideElements(showHeroesBtn);
});

dwarfBtn.addEventListener("click", function () {
    if (epicFight.hero1 === undefined) {
        epicFight.hero1 = dwarf;
    } else {
        epicFight.hero2 = dwarf;
    }
    console.log(epicFight);
    this.innerText = "Hero Selected";
    return epicFight;
});

daemonBtn.addEventListener("click", function () {
    if (epicFight.hero1 === undefined) {
        epicFight.hero1 = daemon;
    } else {
        epicFight.hero2 = daemon;
    }
    console.log(epicFight);
    this.innerText = "Hero Selected";
    return epicFight;
});

dragonBtn.addEventListener("click", function () {
    if (epicFight.hero1 === undefined) {
        epicFight.hero1 = dragon;
    } else {
        epicFight.hero2 = dragon;
    }
    console.log(epicFight);
    this.innerText = "Hero Selected";
    return epicFight;
});

startFightBtn.addEventListener("click", function () {
    epicFight.go();
    showElements(winner, detailsBtn);
    winner.innerHTML = `<span class="winner-result">${
        epicFight.hero1.name
    } vs ${epicFight.hero2.name}</span>
    <span class="winner-result">${epicFight.findWinner()}</span>`;
    hideElements(startFightBtn, dwarfBtn, daemonBtn, dragonBtn);
});

detailsBtn.addEventListener("click", function () {
    showElements(battleDetails);
});
