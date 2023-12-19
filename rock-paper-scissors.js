
document.body.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetScore();

  }
});

let score = JSON.parse(localStorage.getItem('score')) || {
wins: 0,
losses: 0,
ties: 0 
};

updateScoreElement ();

// if (!score) {
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0
//   };
// }

let isAutoPlaying = false;
let intervalId;

/*
const autoPlay = () => {

};

*/

function autoPlay () {
if(!isAutoPlaying) {
  intervalId = setInterval (() => {
    let playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1000);
  isAutoPlaying = true;
  document.querySelector('.js-autoPlay-button')
    .innerHTML = 'Stop Playing'
} else {
  clearInterval(intervalId);
  isAutoPlaying = false;
  document.querySelector('.js-autoPlay-button')
  .innerHTML = 'Auto Play'
}
}


document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-reset-button')
.addEventListener('click', () => {
  resetScore();

});

document.querySelector('.js-autoPlay-button')
.addEventListener('click', () => {
  autoPlay();
});



function resetScore () {
    const htmlElement = `<p>Are you sure want to reset the score!!??</p>
    <div>
      <button class="js-yes-button" >Yes</button>
      <button class="js-no-button">NO</button>
    </div>`
    document.querySelector('.js-divElement')
      .innerHTML = htmlElement;
  
      document.querySelector('.js-yes-button')
        .addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement ();
        document.querySelector('.js-divElement')
        .innerHTML = '';
    });

    document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      document.querySelector('.js-divElement')
      .innerHTML = '';
      });

};


function playGame (playerMove) {

let computerMove = pickComputerMove();
let result = '';

if (playerMove === 'rock') {
  if (computerMove === 'rock') {
    result = 'Tie.';
  } else if (computerMove === 'paper') {
    result = 'You Lose.';
  } else if(computerMove === 'scissors') {
    result = 'You Win.';
  }


} else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You Lose.';
    }

    
} else if(playerMove === 'scissors') {

  if (computerMove === 'rock') {
    result = 'You Lose.';
  } else if (computerMove == 'paper') {
    result = 'You Win.';
  } else if (computerMove = 'scissors') {
    result = 'Tie.';
  }
}

if (result === 'You Win.') {
  score.wins += 1;
} else if (result === 'You Lose.') {
  score.losses += 1;
} else if (result === 'Tie.') {
  score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement ();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You 
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer.`;
}

function updateScoreElement () {
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove () {

const randomNumber = Math.random();
let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1/3) {
  computerMove = ('rock');
} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
  computerMove = ('paper');
} else if (randomNumber >=2/3 && randomNumber < 1) {
  computerMove = ('scissors');
}
return computerMove;
}