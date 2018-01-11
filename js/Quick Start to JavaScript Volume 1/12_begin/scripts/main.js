/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

alert("Story begins");
var weapon = prompt("Chose weapon");
alert("You attack the zombie with your "+ weapon);
randNum = Math.round(Math.random());
if (randNum === 0){
  alert("You Lose!");
} else {
  alert("You Win!");
}

var death = confirm("Do you want to die?");
alert(death);
if (death === false){
  confirm("Are you sure?");
} else {
  alert("goodbye forever");
}



/*
Exception: ReferenceError: weapon is not defined
@Scratchpad/1:12:1
*/