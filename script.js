let boxes = document.querySelectorAll("main button")
let matchResult = document.querySelector("#matchResult")
let reset = document.querySelector("#reset")
let turn = 0
const X = '<img src="./Images/X.svg" alt="">'
const O = '<img src="./Images/O.svg" alt="">'

let line
let i,j // Index of the Tic Tac Toe board

// Representing the Tic Tac Toe board
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

reset.addEventListener("click", () => {
    resetGame()
})

boxes.forEach(b => {
    b.addEventListener("click", () => {
        if (b.innerHTML == "") {
            turn++
            if (turn % 2 == 1) {
                b.innerHTML = X
                let index =  b.getAttribute('id')
                i = Math.floor(index/3)
                j = index%3
                board[i][j] = "X"
                if (checkWinner("X")) {
                    matchResult.innerText = "X Wins"
                    disableButtons()
                }
            }
            else {
                b.innerHTML = O
                let index =  b.getAttribute('id')
                i = Math.floor(index/3)
                j = index%3
                board[i][j] = "O"
                if (checkWinner("O")) {
                    matchResult.innerText = "O Wins"
                    disableButtons()
                }
            }

            if (turn == 9 && matchResult.innerText == "") {
                matchResult.innerText = "Draw"
            }
        }
    })
});

function disableButtons() {
    boxes.forEach(b => {
        b.disabled = true
    })
}

// Function to check for a winner
function checkWinner(player) {
    
     // Check diagonals
     if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        line = document.querySelector("#L2Rdiagonal")
        line.classList.remove("hidden")
        return true; // Diagonal win (top-left to bottom-right)
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        line = document.querySelector("#R2Ldiagonal")
        line.classList.remove("hidden")
        return true; // Diagonal win (top-right to bottom-left)
    }

    
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            line = document.querySelector(`#R${i+1}`)
            line.classList.remove("hidden")
            return true; // Row win
        }
        // Check columns–-
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            line = document.querySelector(`#C${i+1}`)
            line.classList.remove("hidden")
            return true; // Column win
        }
    }

    return false; // No win
}

// Function to reset the game
function resetGame() {
    // Clear the board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }

    // Clear the button text and enabling all buttons
    boxes.forEach(b => {
        b.innerHTML = '';
        b.disabled = false
    });

    // Reset turn count
    turn = 0;

    line.classList.add("hidden")

    // Clear match result message
    matchResult.innerText = '';

}
