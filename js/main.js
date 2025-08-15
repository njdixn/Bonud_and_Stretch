  // game board - array of 9 empty strings
  let board = ["", "", "", "", "", "", "", "", ""];

  // Controls if the game is still ongoing
  let gameActive = true;

  // Get references to status text and board container
  const statusElement = document.getElementById("status");
  const boardElement = document.getElementById("board");

  /* board visuability */
  function renderBoard() {

    // Clear board
    boardElement.innerHTML = "";

    // Loop through each cell in the board array
    board.forEach(cell => {
      const div = document.createElement("div"); // Create a new cell element
      div.className = "cell"; // Apply CSS styling
      div.textContent = cell; // Show X, O, or blank
      boardElement.appendChild(div); // Add to the board container
    });
  }

  /* Checks X or O has won */
  function checkWinner(player) {

    // All winning combinations
    const wins = [
      [0,1,2],[3,4,5],[6,7,8], // Rows
      [0,3,6],[1,4,7],[2,5,8], // Columns
      [0,4,8],[2,4,6]          // Diagonals
    ];

    // Check if any winning combination contains only this player's marks
    return wins.some(combo => combo.every(index => board[index] === player));
  }

  /* Player's turn */
  function playerMove() {

    // Ask user for a move number (1–9)
    let move = prompt(`Your turn! Enter a number (1-9) for your move:`);

    // Convert to zero-based index
    move = parseInt(move) - 1;

    // Check if move is valid and cell is empty
    if (move >= 0 && move < 9 && board[move] === "") {
      board[move] = "X"; // Place player's mark
      renderBoard(); // Update visual board

      // Check if player wins
      if (checkWinner("X")) {
        statusElement.textContent = "You win!";
        gameActive = false;
        return;
      }

      // Check if board is full (draw)
      if (board.every(cell => cell !== "")) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      // Computer takes turn after a short delay (so user sees update)
      setTimeout(computerMove, 500);
    } else {
      // Invalid move — ask again
      alert("Invalid move! Try again.");
      playerMove();
    }
  }

  /* Computer's turn */
  function computerMove() {

    // Get list of empty cells
    let emptyCells = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);

    // Pick a random empty cell
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // Place computer's mark
    board[move] = "O";

    // Update board visually
    renderBoard();

    // Show which position computer chose
    statusElement.textContent = `Computer chose position ${move + 1}`;

    // Check if computer wins
    if (checkWinner("O")) {
      statusElement.textContent = "Computer wins!";
      gameActive = false;
      return;
    }

    // Check if board is full (draw)
    if (board.every(cell => cell !== "")) {
      statusElement.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    // Continue game — let player move next
    setTimeout(playerMove, 500);
  }

  /* Starts the game loop */
  function startGame() {
    renderBoard(); // Draw initial empty board
    setTimeout(playerMove, 500); // Prompt player after short delay
  }

  // Show welcome message
  alert("Welcome to Tic Tac Toe! You are X, computer is O.");

  // Start the game
  startGame();