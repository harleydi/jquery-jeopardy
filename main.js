let grids = document.querySelectorAll('#grid-item')
let gi1 = document.querySelectorAll('#grid-item-1')
let gi2 = document.querySelectorAll('#grid-item-2')
let gi4 = document.querySelectorAll('#grid-item-4')
let gi6 = document.querySelectorAll('#grid-item-6')
let gi8 = document.querySelectorAll('#grid-item-8')
let question = document.querySelector('#question')
let answerInput = document.querySelector('#input-box')
let submitBtn = document.querySelector('#submit-btn')
let scoreEl = document.querySelector('#score')
let oneHundred = []
let twoHundred = []
let fourHundred = []
let sixHundred = []
let eightHundred = []

let score = 0


let current = ''
let currEl = ''



let readJeopardyData = async () => {
    let rawJeopardyData = await fetch('jeopardy.json')
    let data = await rawJeopardyData.json()

    // console.log(data)

    //_groupBy(array, what to group our data by)

    let groupData = _.groupBy(data, 'value')


    oneHundred.push(groupData.$100)
    twoHundred.push(groupData.$200)
    fourHundred.push(groupData.$400)
    sixHundred.push(groupData.$600)
    eightHundred.push(groupData.$800)

}

readJeopardyData()

let activate =  function activate(arr, event) {
    let random = Math.floor(Math.random() * arr[0].length)
    let data = arr[0][random]
    current = data
    console.log(current.answer)
    question.innerText = data.question
    currEl = event.target
    currEl.removeEventListener('click', globalListener, true)
    currEl.style.background = 'transparent'
    currEl.style.border = 'none'
}

function globalListener(event) {
    if (event.target.innerText === '$800') {
        activate(eightHundred, event)
    } else if (event.target.innerText === '$600') {
        activate(sixHundred, event)
    } else if (event.target.innerText === '$400') {
        activate(fourHundred, event)
    } else if (event.target.innerText === '$200') {
        activate(twoHundred, event)
    } else if (event.target.innerText === '$100') {
        activate(oneHundred, event)
    }
}


gi1.forEach((item) => {
    item.addEventListener('click', globalListener, true)
})

gi2.forEach((item) => {
    item.addEventListener('click', globalListener, true)
})

gi4.forEach((item) => {
    item.addEventListener('click', globalListener, true)
})

gi6.forEach((item) => {
    item.addEventListener('click', globalListener, true)
})

gi8.forEach((item) => {
    item.addEventListener('click', globalListener, true)
})


submitBtn.addEventListener('click', function(event){
    event.preventDefault()
    let newScore = current.value.replace('$', '')
    let answer = current.answer.toLowerCase()
    let input = answerInput.value.toLowerCase()
    if (answer !== input) {
        answerInput.value = ''
        return alert('WRONG ANSWER! NO MONEY!')
    } if (answer === input) {
        score += Number(newScore)
        scoreEl.innerText = score
        // console.log('money added');
    } 
    // console.log(answerInput.value);
    answerInput.value = ''
})


