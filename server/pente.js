class Pente {
  constructor() {
    this.board;
    this.player1Score;
    this.player2Score;
    this.winner;
    this.gameOver;
  }
  
  start() {
    // Create blank board
    this.board = [];
    for (let r = 0; r < 15; r++) {
      const row = [];
      for (let c = 0; c < 15; c++) row.push(0);
      this.board.push(row);
    }

    // Reset all variables
    this.player1Score = 0;
    this.player2Score = 0;
    this.winner = null;
    this.gameOver = false;
    
    // Display board
    this.showBoard();
  }
  
  showBoard() {
    console.log('     00  01  02  03  04  05  06  07  08  09  10  11  12  13  14');

    for (let r = 0; r < this.board.length; r++) {
      let row = (r < 10) ? `0${r} |` : `${r} |`;
      for (let c = 0; c < this.board[r].length; c++) {
        const cellValue = (this.board[r][c] === 0) ? ' ' : this.board[r][c];
        row += ` ${cellValue} |`;
      }
      (r === 14) ? console.log(`${row}\n`) : console.log(row);
    }
  }
  
  place(row, col) {
    if (this.board[row] === undefined || this.board[row][col] === undefined) {
      console.log('Invalid coordinate. Please try again.');
    } else if (this.board[row][col] !== 0) {
      console.log('Sorry, there is already a piece placed there.');
    } else {
      // Place player's stone on board
      this.board[row][col] = 'X';
      this.checkEverything(row, col, 1);
      this.showBoard();

      // Initiate computer's turn if game isn't over
      if (!this.gameOver) {
        console.log('Computer is thinking...\n');
        setTimeout(() => { this.computerTurn() }, 1000);
      }
    }
  }
  
  computerTurn() {
    const fiveInARowCoordinates = this.getFiveInARowCoordinates();
    const captureCoordinates = this.getCaptureCoordinates();
    const neighborCoordinates = this.getNeighborCoordinates();
    let coordinate;

    if (fiveInARowCoordinates.length) {
      coordinate = fiveInARowCoordinates[Math.floor(Math.random() * fiveInARowCoordinates.length)];
    } else if (captureCoordinates.length) {
      coordinate = captureCoordinates[Math.floor(Math.random() * captureCoordinates.length)];
    } else {
      coordinate = neighborCoordinates[Math.floor(Math.random() * neighborCoordinates.length)];
    }

    this.board[coordinate[0]][coordinate[1]] = 'O';
    this.checkEverything(coordinate[0], coordinate[1], 2);
    this.showBoard();
  }

  getFiveInARowCoordinates() {
    const coordinates = [];

    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        const current = this.board[row][col];

        // Check up (↑)
        if (row >= 4) {
          if (current === 0 && this.board[row - 1][col] === 'O' && this.board[row - 2][col] === 'O' && this.board[row - 3][col] === 'O' && this.board[row - 4][col] === 'O') {
            coordinates.push([row, col]);
          }
        }

        // Check up right (↗)
        if (row >= 4 && col <= 10) {
          if (current === 0 && this.board[row - 1][col + 1] === 'O' && this.board[row - 2][col + 2] === 'O' && this.board[row - 3][col + 3 === 'O'] && this.board[row - 4][col + 4] === 'O') {
            coordinates.push([row, col]);
          }
        }

        // Check right (→)
        if (col <= 10) {
          if (current === 0 && this.board[row][col + 1] === 'O' && this.board[row][col + 2] === 'O' && this.board[row][col + 3] === 'O' && this.board[row][col + 4] === 'O') {
            coordinates.push([row, col]);
          }
        }

        // Check down right (↘)
        if (row <= 10 && col <= 10) {
          if (current === 0 && this.board[row + 1][col + 1] === 'O' && this.board[row + 2][col + 2] === 'O' && this.board[row + 3][col + 3] === 'O' && this.board[row + 4][col + 4] === 'O') {
            coordinates.push([row, col]);
          }
        }

        // Check down (↓)
        if (row <= 10) {
          if (current === 0 && this.board[row + 1][col] === 'O' && this.board[row + 2][col] === 'O' && this.board[row + 3][col] === 'O' && this.board[row + 4][col] === 'O') {
            coordinates.push([row, col]);
          }
        }

        // Check down left (↙)
        if (row <= 10 && col >= 4) {
          if (current === 0 && this.board[row + 1][col - 1] === 'O' && this.board[row + 2][col - 2] === 'O' && this.board[row + 3][col - 3] === 'O' && this.board[row + 4][col - 4] === 'O') {
            coordinates.push([row, col]);
          }
        }

        // Check left (←)
        if (col >= 4) {
          if (current === 0 && this.board[row][col - 1] === 'O' && this.board[row][col - 2] === 'O' && this.board[row][col - 3] === 'O' && this.board[row][col - 4] === 'O') {
            coordinates.push([row, col]);
          }
        }

        // Check up left (↖)
        if (row >= 4 && col >= 4) {
          if (current === 0 && this.board[row - 1][col - 1] === 'O' && this.board[row - 2][col - 2] === 'O' && this.board[row - 3][col - 3] === 'O' && this.board[row - 4][col - 4] === 'O') {
            coordinates.push([row, col]);
          }
        }
      }
    }

    return coordinates;
  }

  getCaptureCoordinates() {
    const coordinates = [];

    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        const current = this.board[row][col];

        // Check up (↑)
        if (row >= 3) {
          if (current === 0 && this.board[row - 1][col] === 'X' && this.board[row - 2][col] === 'X' && this.board[row - 3][col] === 'O') {
            coordinates.push([row, col, '↑']);
          }
        }

        // Check up right (↗)
        if (row >= 3 && col <= 11) {
          if (current === 0 && this.board[row - 1][col + 1] === 'X' && this.board[row - 2][col + 2] === 'X' && this.board[row - 3][col + 3] === 'O') {
            coordinates.push([row, col, '↗']);
          }
        }

        // Check right (→)
        if (col <= 11) {
          if (current === 0 && this.board[row][col + 1] === 'X' && this.board[row][col + 2] === 'X' && this.board[row][col + 3] === 'O') {
            coordinates.push([row, col, '→']);
          }
        }

        // Check down right (↘)
        if (row <= 11 && col <= 11) {
          if (current === 0 && this.board[row + 1][col + 1] === 'X' && this.board[row + 2][col + 2] === 'X' && this.board[row + 3][col + 3] === 'O') {
            coordinates.push([row, col, '↘']);
          }
        }

        // Check down (↓)
        if (row <= 11) {
          if (current === 0 && this.board[row + 1][col] === 'X' && this.board[row + 2][col] === 'X' && this.board[row + 3][col] === 'O') {
            coordinates.push([row, col, '↓']);
          }
        }

        // Check down left (↙)
        if (row <= 11 && col >= 3) {
          if (current === 0 && this.board[row + 1][col - 1] === 'X' && this.board[row + 2][col - 2] === 'X' && this.board[row + 3][col - 3] === 'O') {
            coordinates.push([row, col, '↙']);
          }
        }

        // Check left (←)
        if (col >= 3) {
          if (current === 0 && this.board[row][col - 1] === 'X' && this.board[row][col - 2] === 'X' && this.board[row][col - 3] === 'O') {
            coordinates.push([row, col, '←']);
          }
        }

        // Check up left (↖)
        if (row >= 3 && col >= 3) {
          if (current === 0 && this.board[row - 1][col - 1] === 'X' && this.board[row - 2][col - 2] === 'X' && this.board[row - 3][col - 3] === 'O') {
            coordinates.push([row, col, '↖']);
          }
        }
      }
    }

    return coordinates;
  }

  getNeighborCoordinates() {
    const coordinates = [];

    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        if (this.board[row][col] === 0) {
          // Check row above
          if (this.board[row - 1]) {
            if (this.board[row - 1][col - 1] === 'X') coordinates.push([row, col]);
            if (this.board[row - 1][col] === 'X') coordinates.push([row, col]);
            if (this.board[row - 1][col + 1] === 'X') coordinates.push([row, col]);
          }

          // Check same row
          if (this.board[row][col - 1] === 'X') coordinates.push([row, col]);
          if (this.board[row][col + 1] === 'X') coordinates.push([row, col]);

          // Check row above
          if (this.board[row + 1]) {
            if (this.board[row + 1][col - 1] === 'X') coordinates.push([row, col]);
            if (this.board[row + 1][col] === 'X') coordinates.push([row, col]);
            if (this.board[row + 1][col + 1] === 'X') coordinates.push([row, col]);
          }
        }
      }
    }

    return coordinates;
  }
  
  checkForCapture(row, col) {
    const current = this.board[row][col];

    // Check up (↑)
    if (row >= 3) {
      if (current === 'X' && this.board[row - 1][col] === 'O' && this.board[row - 2][col] === 'O' && this.board[row - 3][col] === 'X') {
        this.capture('↑', row, col, 1);
      } else if (current === 'O' && this.board[row - 1][col] === 'X' && this.board[row - 2][col] === 'X' && this.board[row - 3][col] === 'O') {
        this.capture('↑', row, col, 2);
      }
    }

    // Check up right (↗)
    if (row >= 3 && col <= 11) {
      if (current === 'X' && this.board[row - 1][col + 1] === 'O' && this.board[row - 2][col + 2] === 'O' && this.board[row - 3][col + 3] === 'X') {
        this.capture('↗', row, col, 1);
      } else if (current === 'O' && this.board[row - 1][col + 1] === 'X' && this.board[row - 2][col + 2] === 'X' && this.board[row - 3][col + 3] === 'O') {
        this.capture('↗', row, col, 2);
      }
    }

    // Check right (→)
    if (col <= 11) {
      if (current === 'X' && this.board[row][col + 1] === 'O' && this.board[row][col + 2] === 'O' && this.board[row][col + 3] === 'X') {
        this.capture('→', row, col, 1);
      } else if (current === 'O' && this.board[row][col + 1] === 'X' && this.board[row][col + 2] === 'X' && this.board[row][col + 3] === 'O') {
        this.capture('→', row, col, 2);
      }
    }

    // Check down right (↘)
    if (row <= 11 && col <= 11) {
      if (current === 'X' && this.board[row + 1][col + 1] === 'O' && this.board[row + 2][col + 2] === 'O' && this.board[row + 3][col + 3] === 'X') {
        this.capture('↘', row, col, 1);
      } else if (current === 'O' && this.board[row + 1][col + 1] === 'X' && this.board[row + 2][col + 2] === 'X' && this.board[row + 3][col + 3] === 'O') {
        this.capture('↘', row, col, 2);
      }
    }

    // Check down (↓)
    if (row <= 11) {
      if (current === 'X' && this.board[row + 1][col] === 'O' && this.board[row + 2][col] === 'O' && this.board[row + 3][col] === 'X') {
        this.capture('↓', row, col, 1);
      } else if (current === 'O' && this.board[row + 1][col] === 'X' && this.board[row + 2][col] === 'X' && this.board[row + 3][col] === 'O') {
        this.capture('↓', row, col, 2);
      }
    }

    // Check down left (↙)
    if (row <= 11 && col >= 3) {
      if (current === 'X' && this.board[row + 1][col - 1] === 'O' && this.board[row + 2][col - 2] === 'O' && this.board[row + 3][col - 3] === 'X') {
        this.capture('↙', row, col, 1);
      } else if (current === 'O' && this.board[row + 1][col - 1] === 'X' && this.board[row + 2][col - 2] === 'X' && this.board[row + 3][col - 3] === 'O') {
        this.capture('↙', row, col, 2);
      }
    }

    // Check left (←)
    if (col >= 3) {
      if (current === 'X' && this.board[row][col - 1] === 'O' && this.board[row][col - 2] === 'O' && this.board[row][col - 3] === 'X') {
        this.capture('←', row, col, 1);
      } else if (current === 'O' && this.board[row][col - 1] === 'X' && this.board[row][col - 2] === 'X' && this.board[row][col - 3] === 'O') {
        this.capture('←', row, col, 2);
      }
    }

    // Check up left (↖)
    if (row >= 3 && col >= 3) {
      if (current === 'X' && this.board[row - 1][col - 1] === 'O' && this.board[row - 2][col - 2] === 'O' && this.board[row - 3][col - 3] === 'X') {
        this.capture('↖', row, col, 1);
      } else if (current === 'O' && this.board[row - 1][col - 1] === 'X' && this.board[row - 2][col - 2] === 'X' && this.board[row - 3][col - 3] === 'O') {
        this.capture('↖', row, col, 2);
      }
    }
  }

  capture(direction, row, col, player) {
    // Remove stones based on direction
    if (direction === '↑') {
      this.board[row - 1][col] = 0;
      this.board[row - 2][col] = 0;
    } else if (direction === '↗') {
      this.board[row - 1][col + 1] = 0;
      this.board[row - 2][col + 2] = 0;
    } else if (direction === '→') {
      this.board[row][col + 1] = 0;
      this.board[row][col + 2] = 0;
    } else if (direction === '↘') {
      this.board[row + 1][col + 1] = 0;
      this.board[row + 2][col + 2] = 0;
    } else if (direction === '↓') {
      this.board[row + 1][col] = 0;
      this.board[row + 2][col] = 0;
    } else if (direction === '↙') {
      this.board[row + 1][col - 1] = 0;
      this.board[row + 2][col - 2] = 0;
    } else if (direction === '←') {
      this.board[row][col - 1] = 0;
      this.board[row][col - 2] = 0;
    } else if (direction === '↖') {
      this.board[row - 1][col - 1] = 0;
      this.board[row - 2][col - 2] = 0;
    }

    // Increment capturer's score
    if (player === 1) {
      this.player1Score += 2;
      console.log(`Captured computer\'s stones!\n`);
    } else if (player === 2) {
      this.player2Score += 2;
      console.log(`Computer captured your stones!\n`);
    }

    // Display current score
    console.log(`Player 1: ${this.player1Score}\nPlayer 2: ${this.player2Score}\n`);
  }

  checkForFiveInARow() {
    let gameOver = false;
      for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
          const current = this.board[row][col];

          // Check up (↑)
          if (!gameOver && row >= 4) {
            if (current === 'X' && this.board[row - 1][col] === 'X' && this.board[row - 2][col] === 'X' && this.board[row - 3][col] === 'X' && this.board[row - 4][col] === 'X') {
              gameOver = true;
            } else if (current === 'O' && this.board[row - 1][col] === 'O' && this.board[row - 2][col] === 'O' && this.board[row - 3][col] === 'O' && this.board[row - 4][col] === 'O') {
              gameOver = true;
            }
          }

          // Check up right (↗)
          if (!gameOver && row >= 4 && col <= 10) {
            if (current === 'X' && this.board[row - 1][col + 1] === 'X' && this.board[row - 2][col + 2] === 'X' && this.board[row - 3][col + 3 === 'X'] && this.board[row - 4][col + 4] === 'X') {
              gameOver = true;
            } else if (current === 'O' && this.board[row - 1][col + 1] === 'O' && this.board[row - 2][col + 2] === 'O' && this.board[row - 3][col + 3 === 'O'] && this.board[row - 4][col + 4] === 'O') {
              gameOver = true;
            }
          }

          // Check right (→)
          if (!gameOver && col <= 10) {
            if (current === 'X' && this.board[row][col + 1] === 'X' && this.board[row][col + 2] === 'X' && this.board[row][col + 3] === 'X' && this.board[row][col + 4] === 'X') {
              gameOver = true;
            } else if (current === 'O' && this.board[row][col + 1] === 'O' && this.board[row][col + 2] === 'O' && this.board[row][col + 3] === 'O' && this.board[row][col + 4] === 'O') {
              gameOver = true;
            }
          }

          // Check down right (↘)
          if (!gameOver && row <= 10 && col <= 10) {
            if (current === 'X' && this.board[row + 1][col + 1] === 'X' && this.board[row + 2][col + 2] === 'X' && this.board[row + 3][col + 3] === 'X' && this.board[row + 4][col + 4] === 'X') {
              gameOver = true;
            } else if (current === 'O' && this.board[row + 1][col + 1] === 'O' && this.board[row + 2][col + 2] === 'O' && this.board[row + 3][col + 3] === 'O' && this.board[row + 4][col + 4] === 'O') {
              gameOver = true;
            }
          }

          // Check down (↓)
          if (!gameOver && row <= 10) {
            if (current === 'X' && this.board[row + 1][col] === 'X' && this.board[row + 2][col] === 'X' && this.board[row + 3][col] === 'X' && this.board[row + 4][col] === 'X') {
              gameOver = true;
            } else if (current === 'O' && this.board[row + 1][col] === 'O' && this.board[row + 2][col] === 'O' && this.board[row + 3][col] === 'O' && this.board[row + 4][col] === 'O') {
              gameOver = true;
            }
          }

          // Check down left (↙)
          if (!gameOver && row <= 10 && col >= 4) {
            if (current === 'X' && this.board[row + 1][col - 1] === 'X' && this.board[row + 2][col - 2] === 'X' && this.board[row + 3][col - 3] === 'X' && this.board[row + 4][col - 4] === 'X') {
              gameOver = true;
            } else if (current === 'O' && this.board[row + 1][col - 1] === 'O' && this.board[row + 2][col - 2] === 'O' && this.board[row + 3][col - 3] === 'O' && this.board[row + 4][col - 4] === 'O') {
              gameOver = true;
            }
          }

          // Check left (←)
          if (!gameOver && col >= 4) {
            if (current === 'X' && this.board[row][col - 1] === 'X' && this.board[row][col - 2] === 'X' && this.board[row][col - 3] === 'X' && this.board[row][col - 4] === 'X') {
              gameOver = true;
            } else if (current === 'O' && this.board[row][col - 1] === 'O' && this.board[row][col - 2] === 'O' && this.board[row][col - 3] === 'O' && this.board[row][col - 4] === 'O') {
              gameOver = true;
            }
          }

          // Check up left (↖)
          if (!gameOver && row >= 4 && col >= 4) {
            if (current === 'X' && this.board[row - 1][col - 1] === 'X' && this.board[row - 2][col - 2] === 'X' && this.board[row - 3][col - 3] === 'X' && this.board[row - 4][col - 4] === 'X') {
              gameOver = true;
            } else if (current === 'O' && this.board[row - 1][col - 1] === 'O' && this.board[row - 2][col - 2] === 'O' && this.board[row - 3][col - 3] === 'O' && this.board[row - 4][col - 4] === 'O') {
              gameOver = true;
            }
          }
        }
      }

    return gameOver;
  }

  checkEverything(row, col, player) {
    // Check for 5 stones in a row
    if (this.checkForFiveInARow()) {
      this.endGame(player);
      return;
    }

    if (!this.gameOver) {
      // Check for captures
      this.checkForCapture(row, col);

      // Check for players with score of 10
      if ((player === 1 && this.player1Score === 10) || (player === 2 && this.player2Score === 10)) {
        this.endGame(player);
      }
    }
  }

  endGame(player) {
    this.winner = player;
    this.gameOver = true;
    console.log(`Game over! Player ${player} wins!\n`);
  }
}

export default Pente;
