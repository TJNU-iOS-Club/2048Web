const BASE_NUMBER = 0
let started = false
let stateMatrix = [
  [BASE_NUMBER, BASE_NUMBER, BASE_NUMBER, BASE_NUMBER],
  [BASE_NUMBER, BASE_NUMBER, BASE_NUMBER, BASE_NUMBER],
  [BASE_NUMBER, BASE_NUMBER, BASE_NUMBER, BASE_NUMBER],
  [BASE_NUMBER, BASE_NUMBER, BASE_NUMBER, BASE_NUMBER]
]

const element = document.getElementsByClassName('game-view')[0]
const mc = new Hammer(element)

mc.get('swipe').set({direction: Hammer.DIRECTION_ALL})

function range (start, end, step) {
  let _end = end || start
  let _start = end ? start : 0
  let _step = step || 1
  if (_end < _start) {
    let tmp = _end
    _end = _start
    _start = tmp
  }
  let _arr = Array((_end - _start) / _step).fill(0).map((v, i) => _start + (i * _step))
  return start < end ? _arr : _arr.reverse().map((v) => v + 1)
}

function drawPoint (vector) {
  let level = stateMatrix[vector[0]][vector[1]]

  let element = $('<div></div>').attr({
    class: `item active level-${level}`,
    style: `transform: translate3d(${vector[1] * 125 + 12.5}%,
                ${vector[0] * 125 + 12.5}%, 0) scale(0.01); z-index: ${level}`,
    'data-row': vector[0],
    'data-col': vector[1],
  })
    .text(stateMatrix[vector[0]][vector[1]])

  setTimeout(() => {
    element.attr({
      class: `item active level-${level}`,
      style: `transform: translate3d(${vector[1] * 125 + 12.5}%,
                ${vector[0] * 125 + 12.5}%, 0) scale(1); z-index: ${level}`
    })

  }, 100)

  $(`.game-view`).append(element)

  let success = false
  for (let i of range(0, 4)) {
    for (let j of range(0, 4)) {
      if (stateMatrix[i][j] === 2048) success = true
    }
  }
  if (success) alert('Succeed!!')
}

function getRandomNumber () {
  let row = parseInt(Math.random() * 4)
  let col = parseInt(Math.random() * 4)
  while (stateMatrix[row][col] !== BASE_NUMBER) {
    row = parseInt(Math.random() * 4)
    col = parseInt(Math.random() * 4)
  }
  return [row, col]
}

function addRandomPosition () {
  let failed = true
  for (let i of range(0, 4)) {
    for (let j of range(0, 4)) {
      if (stateMatrix[i][j] === BASE_NUMBER) {
        failed = false
        break
      }
    }
    if (!failed) break
  }

  if (failed) {
    alert('Failed!!')
    return
  }

  let [row, col] = getRandomNumber()
  stateMatrix[row][col] = 2
  drawPoint([row, col])
}

$(document).ready(() => {
  function initFactory (row, col) {
    return (
      `<div class="item level-1"
          style="left: ${col * 25 + 2.5}%; top: ${row * 25 + 2.5}%" 
          data-row="${row}" 
          data-col="${col}">
      </div>`
    )
  }

  let result = ''

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      result += initFactory(i, j)
    }
  }
  $('.game-view').html(result)
})

$('.restart-button').click(() => {
  started = true

  stateMatrix = [
    [BASE_NUMBER, BASE_NUMBER, BASE_NUMBER, BASE_NUMBER],
    [BASE_NUMBER, BASE_NUMBER, BASE_NUMBER, BASE_NUMBER],
    [BASE_NUMBER, BASE_NUMBER, BASE_NUMBER, BASE_NUMBER],
    [BASE_NUMBER, BASE_NUMBER, BASE_NUMBER, BASE_NUMBER]
  ]

  addRandomPosition()

  $('.restart-button').text('Restart!')
})

const moveBlock = (current, target) => {
  $(`.active[data-row=${current[0]}][data-col=${current[1]}]`)
    .attr({
      style: `transform: translate3d(${target[1] * 125 + 12.5}%, ${target[0] * 125 + 12.5}%, 0);`,
      'data-row': target[0],
      'data-col': target[1]
    })

  stateMatrix[target[0]][target[1]] += stateMatrix[current[0]][current[1]]
  stateMatrix[current[0]][current[1]] = BASE_NUMBER
}

const legalPosition = (vector) => ((vector[0] > -1 && vector[0] < 4) && (vector[1] > -1 && vector[1] < 4))

const positionController = (vector) => {
  if (!started) return

  let originalState = JSON.stringify(stateMatrix)
  let rowRange = [range(0, 4), range(0, 4), range(0, 4).reverse()][vector[0] + 1]
  let colRange = [range(0, 4), range(0, 4), range(0, 4).reverse()][vector[1] + 1]
  console.log('-----> Start')
  for (let row of rowRange) {
    for (let col of colRange) {
      let current = [row, col]
      let next = [row + vector[0], col + vector[1]]
      while (legalPosition(next)) {
        let isZero = stateMatrix[next[0]][next[1]] === BASE_NUMBER
        let isEqual = stateMatrix[next[0]][next[1]] === stateMatrix[current[0]][current[1]] &&
          stateMatrix[next[0]][next[1]] !== BASE_NUMBER &&
          stateMatrix[current[0]][current[1]] !== BASE_NUMBER
        if (isZero || isEqual) {
          moveBlock(current, next)
          if (isEqual) {
            drawPoint(next)
            break
          }
          current = next
          next = [next[0] + vector[0], next[1] + vector[1]]
        } else {
          break
        }
      }
    }
  }
  let currentState = JSON.stringify(stateMatrix)
  if (originalState !== currentState) addRandomPosition()
  console.log(JSON.stringify(stateMatrix))
}

$(document).keydown((e) => {
  if (e.keyCode < 37 && e.keyCode > 40) return

  switch (e.keyCode) {
    case 37:
      positionController([0, -1])
      break
    case 38:
      positionController([-1, 0])
      break
    case 39:
      positionController([0, 1])
      break
    case 40:
      positionController([1, 0])
      break
  }
})

mc.on('swipeleft',  () => { positionController([0, -1]) })
mc.on('swipeup',    () => { positionController([-1, 0]) })
mc.on('swiperight', () => { positionController([0, 1]) })
mc.on('swipedown',  () => { positionController([1, 0]) })

