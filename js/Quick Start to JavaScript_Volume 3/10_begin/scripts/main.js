/*
-Set the stage/Intro
-Name Your Character
-Choose a class
-Scenario + Options
-Class check vs option requirements
-Outcome

*/
var outcome;

window.alert("One day you wake up and the world as you know has ended.  The dead come to life and prey on the living. There is no hope, no cure, only survival.  Welcome to the zombie apocalypse.");
var beginningScenarios = ["You wake up in a hospital.  It is eerily quiet.  You tiptoe to the door and peek out.", "You are standing in an open field west of a white house with a boarded front door. There is a small mailbox here.", "Desperate times call for desperate measures.  You see a small convenience store up ahead and decide to loot it for goods." ];


function randomNumber(range) {
  "use strict";
  if (typeof range === "number") {
    return Math.round(Math.random() * range);
  }
}

window.alert(beginningScenarios[randomNumber(beginningScenarios.length - 1)]);


var character = {
  health: 5,
  strength: 0,
  stealth: 0,
  name: window.prompt("What is your name?"),
  characterClass: window.prompt("These times test the strengths of our character. What were you before the war? (Choose from: soldier, doctor, or politician)").toLowerCase()
 
};

if (!character.name) {
  character.name = window.prompt("I don't know what to call you if you don't enter a name. If you don't answer I will be forced to name you myself...Last chance. What is your name?");
  
  if (!character.name) {
    window.alert("Well I did try to warn you. Gunther Piddles it is then.");
    character.name = "Gunther Piddles";
  }
  
}

if (character.characterClass === "soldier") {
  character.strength = 5;
}
if (character.characterClass === "politician") {
  character.stealth = 5;
}
if (character.characterClass === "doctor") {
  character.health = 7;
}

var choice = window.prompt("The brave adventurer and former " + character.characterClass + " " + character.name + " enters a store for some loot.  You notice a zombie slowly shuffling around amongst the destruction. What action shall you take? Attack, or attempt to sneak by the zombie? ").toLowerCase();

if (choice === "attack") {
  if (character.strength === 5) {
    window.alert("Using only your bare hands, you slay that zombie! Success! You loot the store for goods and find an axe, a pack of batteries, and three cans of Beanie Weenies.");
    outcome = "win";
    character.strength++;
  } else if (character.strength <= 5) {
    window.alert("You fearlessly charge the zombie with all your strength.  Using your mighty powers you crush thy foe as if it were a sheet of paper you needed to shred.");
    window.alert("Just kidding. You are immediately bitten by the zombie and die. But not all is lost -- if time spent together makes one friends, then you and the zombie become best friends, and live together for eternity. The end.");
    outcome = "lose";
  }
}

if (choice === "sneak" || choice === "sneak by the zombie") {
  if (character.stealth === 5) {
    window.alert("You sneak by the zombie, you clever bastard.");
  }
  if (character.stealth < 5) {
    window.alert("You try to slip by the zombie, but you accidentally stumble over a can of Beanie Weenies, alerting the zombie of your existence. It slowly turns its head and shuffles towards you.");
    if (character.strength === 5) {
      window.alert("Although you have alerted the zombie to your presence you are able to crush its skull with your bare hands.");
      outcome = "win";
    } else {
      window.alert("Weaponless and weak the zombie chomps down on an arm as you flail wildly in its general direction.");
      outcome = "lose";
    }
  }
}

if (outcome === "lose") {
  window.alert("You lose!");
} else if (outcome === "win") {
  window.alert("You win!");
}