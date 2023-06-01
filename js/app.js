"use strict";
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
let board;
let turn;
let winner;
let tie;
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#btn");
squareEls.forEach((value, index) => {
    value.addEventListener("click", function () {
        const sqIdx = index;
        handleClick(sqIdx);
    });
});
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach((value, index) => {
        if (value === 1) {
            squareEls[index].innerHTML = "X";
        }
        else if (value === -1) {
            squareEls[index].innerHTML = "O";
        }
        else {
            squareEls[index].innerHTML = "";
        }
    });
}
function updateMessage() {
    let player = "O";
    if (turn === 1) {
        player = "X";
    }
    if (winner === false && tie === false) {
        messageEl.innerHTML = `${player}'s turn!`;
    }
    else if (winner === false && tie === true) {
        messageEl.innerHTML = `It's a tie!`;
    }
    else {
        messageEl.innerHTML = `${player} has won! Congratualtions! Try again?`;
    }
}
function handleClick(sqIdx) {
    if (board[sqIdx] !== 0) {
        return;
    }
    else if (winner === true) {
        return;
    }
    placePiece(sqIdx);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
}
function placePiece(idx) {
    board[idx] = turn;
}
function checkForTie() {
    if (!board.includes(0)) {
        tie = true;
    }
}
function checkForWinner() {
    winningCombos.forEach((combo) => {
        const a = combo[0];
        const b = combo[1];
        const c = combo[2];
        const sum = Math.abs(board[a] + board[b] + board[c]);
        if (sum === 3) {
            winner = true;
            confetti.start(3000);
        }
    });
}
function switchPlayerTurn() {
    if (winner === true) {
        return;
    }
    else if (winner === false) {
        turn *= -1;
    }
}
init();
checkForWinner();
