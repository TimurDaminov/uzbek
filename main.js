const massiveWords = [
    "Qatag'on qurboni",
    "G'avvos",
    "Xamsa",
    "Madhiya",
    "Roman",
    '"Kecha va kunduz"',
    `"O'tgan kunlar"`,
    "Zaynab",
    "Kumush",
    "Otabek",
    "Anvar",
    "Dilorom va Bahrom",
    "Farhod va Shirin",
    "Husayn Boyqaro",
    "Alifbo",
    "O'qish kitobi",
    '"Kamtarlik"',
    '"Adolat"',
    "Ruboiy",
    "G'azal",
    "Komediya",
    "Xalqlar do'stligi saroyi",
    `"O'zbekiston" mehmonxonasi`,
    "Sibir",
    "O'zbekiston qahramoni",
    "Toshkent",
    "Hirot",
    "Andijon",
    "Hindiston",
    "Chingiz Aytmatov",
    "Julqunboy",
    '"Gamlet"',
    '"Revizor"',
    `"Кеlinlar qo'zg'oloni"`,
    `"O'zbekiston qahramoni"`,
    'Sevara Nazarxon',
    'Metropoliten',
    '"Sher bilan durroj"',
    '9-fevral',
    '14-fevral'
]

const breakPoints = [5, 11, 18, 25, 32, 38, 42]

function createElement(tag = 'div', text = '', classList = [], attrs = {}) {
    let element = document.createElement(tag)
    element.classList.add(...classList)
    element.textContent = text
    for (const prop in attrs) {
        element[prop] = attrs[prop]
    }
    return element
}

function checkBreakPoints(array, count) {
    for (const item of array) {
        if (item === count && count <= item) {
            return true
        }
    }
    return false
}

function checkProgress() {
    let prog = (finishedItems / 40) * 100
    prog = Math.round(prog * 10) / 10;
    return prog
}

function openModal(text) {
    const modal = document.getElementById('modal')
    modal.style.opacity = 1
    modal.style.visibility = 'visible'
    const textCont = document.getElementById('modal-text')
    textCont.textContent = text

    const close = document.getElementById('modal-close')
    close.addEventListener('click', () => {
        modal.style.opacity = 0
        modal.style.visibility = 'hidden'
    })
}

function createItem(list, text) {
    const liItem = createElement('li', '', ['right__item'])
    const btnItem = createElement('button', '', ['btn-reset', 'right__item-btn'])
    liItem.append(btnItem)
    list.append(liItem)

    btnItem.addEventListener('click', () => {
        finishedItems++
        const progressText = document.getElementById('progress')
        progressText.textContent = `${checkProgress()}%`
        liItem.remove()
        openModal(text)
    })
}

function randomWithTrue() {
    const randomNumber = Math.floor(Math.random() * 40) + 1;
    return randomNumber === 1;
}

var finishedItems = 0
var countUl = 2

function createLine(array) {
    const listArray = document.getElementById('items')
    countUl = 1
    let listItems = createElement('ul', '', ['list-reset', 'right__column'])
    listArray.append(listItems)
    let bonusIts = false
    for (const text of array) {
        if (checkBreakPoints(breakPoints, countUl) === true) {
            listItems = createElement('ul', '', ['list-reset', 'right__column'])
            listArray.append(listItems)
        }
        if (randomWithTrue() === true && bonusIts === false) {
            createItem(listItems, 'Bonus!')
            bonusIts = true
            countUl++
            continue
        } else {
            createItem(listItems, text)
            countUl++
        }
    }
}

function startGame(array, progText, itemsArray) {
    const finishBtn = createElement('button', 'Завершить', ['btn-reset', 'finish-btn'])
    array.append(finishBtn)
    progText.textContent = '0%'
    createLine(massiveWords)
    finishBtn.addEventListener('click', () => {
        finishBtn.remove()
        finishGame(array, progText, itemsArray)
    })
}

function finishGame(array, progText, itemsArray) {
    itemsArray.textContent = ''
    finishedItems = 0
    progText.textContent = '0%'
    const startBtn = createElement('button', 'Начать', ['btn-reset', 'start-btn'])
    array.append(startBtn)
    startBtn.addEventListener('click', () => {
        startBtn.remove()
        startGame(array, progText, itemsArray)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = createElement('button', 'Начать', ['btn-reset', 'start-btn'])
    const leftArray = document.getElementById('left')
    const progressText = document.getElementById('progress')
    progressText.textContent = '0%'
    leftArray.append(startBtn)
    const itemsArray = document.getElementById('items')
    startBtn.addEventListener('click', () => {
        startBtn.remove()
        startGame(leftArray, progressText, itemsArray)
    })
})