import {startConfetti,stopConfetti,removeConfetti} from './confetti.js';

const playerScoreEL = document.getElementById('playerScore');
const playerChoiceEL = document.getElementById('playerChoice');
const computerScoreEL = document.getElementById('computerScore');
const computerChoiceEL = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors'/*, 'lizard'*/] },
  paper: { name: 'Paper', defeats: ['rock'/*, 'spock'*/] },
  scissors: { name: 'Scissors', defeats: ['paper'/*, 'lizard'*/] }//,
  //lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  //spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = '';
let playerScoreNumber = 0;
let computerScoreNumber = 0;

function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
}

//Reset score & playerChoice/computerChoice
function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEL.textContent = playerScoreNumber;
  computerScoreEL.textContent = computerScoreNumber;
  playerChoiceEL.textContent = '';
  computerChoiceEL.textContent = '';
  resultText.textContent = '';
  resetSelected();
}
window.resetAll = resetAll;

//Random computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if(computerChoiceNumber < 0.33) {
    computerChoice = 'rock';
  } else if(computerChoiceNumber <= 0.66) {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  }
}

//Add 'selectd' styling and components
function displayComputerChoice() {
  switch(computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEL.textContent = ' --- Rock'
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEL.textContent = ' --- Paper'
      break;
      case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEL.textContent = ' --- Scissors'
      break;
    default:
      break;
    
  }
}

//Check result,increase scores,update result text
function updateScore(playerChoice) {
  if(playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice =choices[playerChoice];
    if(choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = "You Won!";
      playerScoreNumber++;
      playerScoreEL.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You Lost!";
      computerScoreNumber++;
      computerScoreEL.textContent = computerScoreNumber;
    }
  }
}

//Call functions to process run
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

//Passing player selection vlue and styling icons

function select(playerChoice) {
  checkResult(playerChoice);
  //Add 'selected' styling & playerChoice
  switch(playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEL.textContent = ' --- Rock'
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEL.textContent = ' --- Paper'
      break;
      case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEL.textContent = ' --- Scissors'
      break;
    default:
      break;
    
  }
}
window.select = select;

//On startup, set initial values
resetAll();