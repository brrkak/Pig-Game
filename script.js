"use strict";

//Selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnhold = document.querySelector(`.btn--hold`);
let score, currentScore, activePlayer, playing;
//Starting conditions

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};
init();
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Random Dice Roll

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1. Generating a random dice roll
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    //2. Display Roll
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${randomNumber}.png`;
    //3. check for rolled 1: if ture, switch to next player
    if (randomNumber !== 1) {
      //Add dice to current score
      currentScore += randomNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch Next player
      switchPlayer();
    }
  }
});

// Hold Button
btnhold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to active plyer's score
    score[activePlayer] += currentScore;
    // score[1] = score[1] + currentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. check if players's score is => 100
    if (score[activePlayer] >= 100) {
      // Finish The Game
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

// New Game Button
btnNew.addEventListener("click", init);
