/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

alert("It is the zombie apocalypse.  You are looting a store and suddenly a zombie bursts through the door!");
var weapon = prompt("You search around frantically for a weapon.  What do you choose?  A bow and arrow, an axe, or a rubber chicken?");
var randomNumber = Math.round(Math.random());

alert("You attack the zombie with your" + " " + weapon);

if(randomNumber === 0 ){
  alert("The zombie bites you.  You lose!!!");
} else if (randomNumber === 1 ){
  alert("You kill the zombie with your" + " " + weapon + ". You win!");
}