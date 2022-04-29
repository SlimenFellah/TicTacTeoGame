const circleClass = 'circle'
const xClass = 'x'
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
let circleTurn
let showClass = 'show'

const board = document.getElementById('border')
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessage = document.querySelector('[data-finalMessage]')
const winningMessageText = document.querySelector('[data-finalMessageText]')
const winningMessageBtn = document.querySelector('[data-finalMessageBtn]')
const startMessage = document.querySelector('[data-startMessage]')
const xbtn = document.getElementById('xbtn')
const obtn = document.getElementById('obtn')
const xScore = document.getElementById('xScore')
const oScore = document.getElementById('oScore')
const dScore = document.getElementById('dScore')
const drawScore = document.getElementById('drawScore')
/* comment */
let scrX = 0
let scrO = 0
let scrD = 0

xbtn.addEventListener('click', setX)
obtn.addEventListener('click', setO)

function setX (){
    circleTurn = false
    setBoardHover()
    startMessage.classList.remove(showClass)

}
function setO (){
    circleTurn = true
    setBoardHover()
    startMessage.classList.remove(showClass)
}

startGame()
winningMessageBtn.addEventListener('click', startGame)
function startGame() { 
    winningMessage.classList.remove(showClass)
    startMessage.classList.add(showClass)
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick)
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.addEventListener('click', handleClick , {once : true})
    })
    xScore.innerText = scrX
    oScore.innerText = scrO
    dScore.innerText = scrD

}

function handleClick(e) {
    e.target.classList.add(circleTurn ? circleClass : xClass)
    if (checkForWin(circleTurn)) {
        endGame(true)
    }
    else if (isDraw()) {
        endGame(false) 
    } else {
        swapTurn()
        setBoardHover()
    }
}

function isDraw () {
    return [...cellElements].every((cell) => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}

function setBoardHover(){
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    board.classList.add(circleTurn ? circleClass : xClass)
}

function checkForWin(circleTurn) {
    const currentClass = circleTurn ? circleClass : xClass
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass) })
    })
}
function endGame(bol){
    const currentClass = circleTurn ? circleClass : xClass
    winningMessage.classList.add('show')
    if (bol) {

        winningMessageText.innerText = circleTurn ? 'Circle wins' : 'X wins'
        if (circleTurn) {scrO = scrO + 1}
        else {scrX = scrX + 1}
        
        
    }
    else {
        winningMessageText.innerText = 'Draw'
        scrD = scrD + 1
    }
}

function swapTurn(){
    circleTurn = !circleTurn
}