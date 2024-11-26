"use strict";

/*
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "🎉 Correct Number! ";

console.log(document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 90;

document.querySelector(".guess").value = 10;
console.log(document.querySelector(".guess").value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
  return message;
};

const setNumber = function (number) {
  document.querySelector(".number").textContent = number;
  return number;
};

const setStyle = function (element, property, value) {
  document.querySelector(element).style[property] = value;
  return element, property, value;
};

const updateScore = function (newScore) {
  score = newScore;
  return (document.querySelector(".score").textContent = score);
};
const playerWon = function () {
  displayMessage(`You won the game! 🎉`);
  setStyle("body", "backgroundColor", "#60b347");
  setStyle(".number", "width", "30rem");
  setNumber(secretNumber);
};

const playerLost = function () {
  displayMessage(`😭 You lost the game!`);
  updateScore(0);
  setStyle("body", "backgroundColor", "#c92a2a");
};
const resetGame = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  displayMessage("Start guessing...");
  setNumber("?");
  updateScore(score);
  document.querySelector(".guess").value = "";
  setStyle("body", "backgroundColor", "#222");
  setStyle(".number", "width", "15rem");
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  // When there is no input
  if (!guess) {
    displayMessage(`⛔ No number!`);

    // When the player wins
  } else if (guess === secretNumber) {
    playerWon();

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
    // When user guess wrong number
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      updateScore(score);
    } else {
      playerLost();
    }
  }
});
document.querySelector(".again").addEventListener("click", resetGame);
