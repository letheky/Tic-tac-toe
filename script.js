const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let originalArr = [1,2,3,4,5,6,7,8,9]
let playerMoves = []
let computerMoves = []
const computerWinTxt = 'Congratulation! The winner is Computer!'
const playerWinTxt = 'Congratulation! The winner is Player!'
const gameBoard = $('.game-board')
const resetBtn = $('.reset-btn')
const result = $('.result')
const gameOption = $('#game-mode')

createBoard(9)

function createBoard(blocks){
    for(let i=0; i<blocks;i++){
        const div = document.createElement('div')
        div.classList.add('game-block')
        div.id = `block${i+1}`
        gameBoard.appendChild(div)
    }
}

const gameBlocks = $$('.game-block')
gameBlocks.forEach(block => block.onclick = () => {
        block.textContent = "X"
        playerMoves.push(Number(block.id.slice(-1)))
        playNormalRound()
})

function getEmptyBlock(arr1,arr2){
    for(let i of arr1){
        if(arr2.includes(i))arr1.splice(arr1.indexOf(i),1)
    }
}

function computerUsualTurn(){
    if(originalArr.length>0){
        let computerRandomMove = Math.floor(Math.random()*originalArr.length)
        computerMoves.push(originalArr[computerRandomMove])
        const computerPresentMove = $(`#block${originalArr[computerRandomMove]}`)
        computerPresentMove.textContent = "O"
        computerPresentMove.setAttribute('style','pointer-events:none;')
    }

}

function checkRow(arr){
    if( arr.includes(1)&&arr.includes(2)&&arr.includes(3)||
        arr.includes(4)&&arr.includes(5)&&arr.includes(6)||
        arr.includes(7)&&arr.includes(8)&&arr.includes(9))return true
}
function checkColumn(arr){
    if( arr.includes(1)&&arr.includes(4)&&arr.includes(7)||
        arr.includes(2)&&arr.includes(5)&&arr.includes(8)||
        arr.includes(3)&&arr.includes(6)&&arr.includes(9))return true
}
function checkDiagonal(arr){
    if( arr.includes(1)&&arr.includes(5)&&arr.includes(9)||
        arr.includes(3)&&arr.includes(5)&&arr.includes(7))return true
}

function isWinner(arr,str){
    if(checkColumn(arr) || checkRow(arr) || checkDiagonal(arr)){
        const h1 = document.createElement('h1')
        h1.textContent = str
        h1.classList.add('result-title')
        result.appendChild(h1)
        gameBlocks.forEach(block =>{
            block.setAttribute('style','pointer-events:none;')
        })
        return true
    }
    else return false   
}

function isDraw(){
    if(playerMoves.length + computerMoves.length === 9)return true
}

function setDraw(){
    const h1 = document.createElement('h1')
    h1.classList.add('result-title')
    result.appendChild(h1)
    h1.textContent = 'This game is Draw. Press Restart button to play again'
}

function playNormalRound(){
    getEmptyBlock(originalArr,playerMoves)
    if(!isWinner(playerMoves,playerWinTxt)){
        console.log(computerMoves,playerMoves,originalArr)
        computerUsualTurn()
        if(!isWinner(computerMoves,computerWinTxt)){
            getEmptyBlock(originalArr,computerMoves)
            if(isDraw())setDraw()
        }
    }
}

// function playHardRound(){
//     getEmptyBlock(originalArr,playerMoves)
//     if(checkPlayMoves(playerMoves)){

//     }
// }

// function checkPlayMoves(arr){
//     return checkPlayerRow(arr) || checkPlayerColumn(arr) || checkPlayerDiagonal(arr)
// }

// function checkPlayerRow(arr){
//     if(arr.includes(1)){
//         if(arr.includes(2)||arr.includes(3))return true
//     }
//     else if(arr.includes(4)){
//         if(arr.includes(5)||arr.includes(6))return true
//     }
//     else if(arr.includes(7)){
//         if(arr.includes(8)||arr.includes(9))return true
//     }
// }

// function checkPlayerColumn(arr){
//     if(arr.includes(1)){
//         if(arr.includes(4)||arr.includes(7))return true
//     }
//     else if(arr.includes(2)){
//         if(arr.includes(5)||arr.includes(8))return true
//     }
//     else if(arr.includes(3)){
//         if(arr.includes(6)||arr.includes(9))return true
//     }
// }

// function checkPlayerDiagonal(arr){
//     if(arr.includes(1)){
//         if(arr.includes(5)||arr.includes(9))return true
//     }
//     else if(arr.includes(3)){
//         if(arr.includes(5)||arr.includes(7))return true
//     }
// }

resetBtn.onclick = () =>{
    gameBlocks.forEach(block =>{
        block.textContent = ""
        block.setAttribute('style','pointer-events:auto;')
    })
    originalArr = [1,2,3,4,5,6,7,8,9]
    playerMoves = []
    computerMoves = []
    const h1 = $('.result-title')
    if(h1)result.removeChild(h1)
}
