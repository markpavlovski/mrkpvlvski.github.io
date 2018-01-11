/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
var randNum = Math.round(Math.random()*15);

if (randNum % 3 === 0 && randNum !== 0 ){
  alert("fizz");
}else if (randNum % 5 === 0 && randNum !== 0){
  alert("buzz");
} else if (randNum % 3 === 0 && randNum %5 === 0){
  alert("fizzbuzz");
} else {
  console.log(randNum);
}


