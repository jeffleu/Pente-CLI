import readline from 'readline';
import Pente from './pente';

const game = new Pente();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Welcome to Pente! Would you like to start a new game? (y/n) ', (response) => {
  if (response === 'n' || response === 'no') {
    console.log('Well, maybe next time... (exit: ctrl + c)');
    rl.close();
  } else if (response === 'y' || response === 'yes') {
    game.start();
    play();
  }
});

const play = () => {
  if (!game.gameOver) {
    rl.question('Your turn. Enter location to place piece (x, y): ', (response) => {
      response = response.split(',');
      game.place(+response[1], +response[0]);
      (!game.gameOver) ? setTimeout(() => { play() }, 1100) : playAgain();
    });
  } else {
    playAgain();
  }
};

const playAgain = () => {
  rl.question('Would you like to play again? (y/n) ', (response) => {
    if (response === 'n' || response === 'no') {
      console.log('Thanks for playing! (exit: ctrl + c)');
      rl.close();
    } else if (response === 'y' || response === 'yes') {
      game.start();
      play();
    } else {
      console.log('Invalid choice. Please try again.');
      playAgain();
    }
  });
};
