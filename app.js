let gameBoard=["","","","","","","","",""]

let turn =0;

let winner =false;

const player = (name) =>{
    name=name;
    return {name};
}
let playerX=player("")
let playerO=player("")

function app() {
    let inputField=document.getElementById(".input-field").focus()

    const addAPlayer = document.getElementById("player-form")
    addAPlayer.addEventListener("submit",addAPlayer)

    let replayButton = document.querySelector(".replay-btn")
    replayButton.addEventListener("click", resetBoard)
}

function addAPlayer(event) {
    event.preventDefault();
    if(this.player1.value === "" || this.player2.value === "") {
        alert("Submit your name!")
        return
    }

    const playerFormContainer = document.querySelector(".enter-players")
    const boardMain = document.querySelector(".board_main")
    playerFormContainer.classList.add("hide-container");
    boardMain.classList.remove("hide-container")

    playerX.name = this.player1.value
    playerO.name = this.player2.value
}

function currentPlayer() {
    return turn % 2 === 0 ?"X" : "O"
}

function buildBoard() {
    let resetContainer = document.querySelector(".reset")

    resetContainer.classList.remove("reset--hidden")

}

function makeAMove(event) {
    console.log(turn);

    let currentCell = parseInt(even.currentTarget.firstElementChild.dataset.id)
    let cellAddMark = document.querySelector(`[data-id = '${currentCell}]`)

    if (cellAddMark.innerHTML == "") {
        console.log("Someone took this square!");
        return;

    }else{
        if (currentPlayer() === "X") {
            cellAddMark.textContent=currentPlayer();
            gameBoard[currentCell] = "X"
        }else {
            cellAddMark.textContent = currentPlayer();
            gameBoard[currentCell] = "O"
        }
        }
        youWon()
        turn++;
    }

function checkforTie() {
    if (turn > 7) {
        alert ("You both lost!")
    }
}
function youWon() {

    const winningCombos =[
        [0,1,2]
        [3,4,5]
        [6,7,8]
        [0,3,6]
        [1,4,7]
        [2,5,8]
        [0,4,8]
        [2,4,6]

    ]
    winningCombos.forEach((winningCombos) => {
        let cell1 = winningCombos[0]
        let cell2 = winningCombos[1]
        let cell3 = winningCombos[2]

        if(
            gameBoard[cell1] === currentPlayer() &&
            gameBoard[cell2] === currentPlayer() &&
            gameBoard[cell3] === currentPlayer()
        ) {
            const cells = document.querySelectorAll(".board_cell");
            
            cells.forEach((cell) => {
                let cellId = cell.firstElementChild.dataset.id
                if(cellId === cell1 || cellId === cell2 || cellId === cell3) {
                    cell.classList.add("board__cell-winner")
                }
            })
            let currentPlayerText = document.querySelector(".board___player-turn")
            if(currentPlayer() === "X") {
                currentPlayerText.innerHTML =`
                <div class = "Congratulations"> You WON!${playerX.name} </div>
                `
                winner=true
                return true
            }
        }
    })
    if(winner) {
        checkForTie();
    }
    return false;
}
function changeBoardHeaderNames() {
    if(!winner) {
        let currentPlayerText = document.querySelector(".board_player-turn")
        if(currentPlayer() === "X") {
            currentPlayer.innerHTML =
            `
            <span class = "name--style">${playerX.name} </span>, Your Turn!
            <div class = "u-r-winner"></div>
            `
        } else {
            currentPlayerText.innerHTML =`
            <span class = "name--style">${playerY.name} </span>, Please place a mark!
            <div class = "u-r-winner"></div>
            `
        }
    }
}

function resetBoard() {
    console.log("resetting")

    gameBoard = ["","","","","","","","",""]

    let cellAddMark = document.querySelectorAll(".letter");
    cellAddMark.forEach((square) => {
        square.textContent = ""
        square.parentElement.classList.remove("board__cell--winner")
    })

    turn = 0;
    winner = false
    let currentPlayerText = document.querySelectorAll(".board__player--turn");
    currentPlayerText.innerHTML = `
    <span class = "name--style">${playerX.name} </span>, Your Turn!
    <div class = "u-r-winner"></div>
    `;
    addCellClickListener()
}

function addCellClickListener() {
    const cells = document.querySelectorAll(".board__cell")
    cells.forEach((cell) => {
    cell.addEventListener("click", makeMove)
    })
}

function removeCellClicklistener() {
    let allCells = document.querySelectorAll(".board__cell")
    allCells.forEach((cell) => {
    cell.removeEventListener("click",makeMove)
    })
}