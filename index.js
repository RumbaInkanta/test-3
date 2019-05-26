let buttons = document.querySelectorAll('button')
let timer = document.getElementById('timer')
let start = document.querySelector('.btnStart')
const arrColors = ['#63E079','#0A4715','#84AD5D','#C991B8','#8F63E0','#97DFE9','#36B3A0',
'#5C5CE6','#63E079','#0A4715','#84AD5D','#C991B8','#8F63E0','#97DFE9','#36B3A0','#5C5CE6']//массив с повтором цветов
let intClicks = 0, couple = 0, startTimeInterval = 0

start.addEventListener('click', newGame)

function newGame() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',reveal)
    buttons[i].style.backgroundColor = 'rgb(255, 255, 255)'
  }
  stopTime()//нужен при повторном клике на кнопку
  startTime()
  arrColors.sort(function(){return Math.random() - 0.5})//смешиваем
}

function reveal(event) {
  objButton = event.target
  intClicks++
  if (intClicks <= 2) { //в надежде спасти setTimeout от множественных кликов
    objButton.style.backgroundColor = arrColors[objButton.id - 1] //отображаем цвета из массива
    if (objButton.style.backgroundColor == 'rgb(255, 255, 255)') {
      intClicks--
    }
    
    if (intClicks > 1) {
      if (objButton.style.backgroundColor == strSaved) {
        window.setTimeout('removeButtons()', 800)
      } else {
        window.setTimeout('hideButtons()', 800)
      }
    } else {
      strSaved = objButton.style.backgroundColor //сохраняем
      objSaved = objButton
    }
  }
}

function startTime() {
  let thisDate = new Date()
  startTimeInterval = setInterval(function(){
    let new_date = new Date() - thisDate
    let sec   = Math.abs(Math.floor(new_date/1000)%60)
    let min   = Math.abs(Math.floor(new_date/1000/60)%60)
    let hours = Math.abs(Math.floor(new_date/1000/60/60)%24)
    if (sec.toString().length   == 1) sec   = '0' + sec
    if (min.toString().length   == 1) min   = '0' + min
    if (hours.toString().length == 1) hours = '0' + hours
    timer.textContent = hours + ':' + min + ':' + sec
  },100)
}

function stopTime(){
  clearInterval(startTimeInterval)
}

function removeButtons() {
  objSaved = null
  intClicks = 0
  couple++ //пара совпала
  if (couple === 8) {//все 8 пар совпали
    rezult = timer.textContent
    stopTime()
    alert('Ваш результат: ' + rezult)
  }
}

function hideButtons() {
  objButton.style.backgroundColor = 'rgb(255, 255, 255)'
  objSaved.style.backgroundColor = 'rgb(255, 255, 255)'
  objSaved = null
  intClicks = 0
}

