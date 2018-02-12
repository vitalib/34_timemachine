var TIMEOUT_IN_SECS = 3 * 60
var TEMPLATE = '<h1><span class="js-timer-minutes">00</span>:<span class="js-timer-seconds">00</span></h1>'
var MOTIVATION = [
  "То, что не начато сегодня – не закончить завтра.",
  "Пессимист видит трудность в любой возможности; оптимист – видит возможность в любой трудности.",
  "Сделаешь дело - отдохнешь смело...",
  "Самым значительным барьером на пути к успеху является страх перед неудачей.",
  " Чтобы плыть против течения рыба должна быть сильной, плыть по течению может даже мёртвая рыба.",
  "Если хотите добиться успеха, задайте себе 4 вопроса: Почему? А почему бы и нет? Почему бы и не я? Почему бы и не прямо сейчас? "
]

function getMotivationMessage(){
  var ind = Math.floor(Math.random() * MOTIVATION.length);
  console.log(ind);
  return MOTIVATION[ind];
}

function padZero(number){
  return ("00" + String(number)).slice(-2);
}

class Timer{
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  constructor(timeout_in_secs){
    this.initial_timeout_in_secs = timeout_in_secs
    this.reset()
  }
  getTimestampInSecs(){
    var timestampInMilliseconds = new Date().getTime()
    return Math.round(timestampInMilliseconds/1000)
  }
  start(){
    if (this.isRunning)
      return
    this.timestampOnStart = this.getTimestampInSecs()
    this.isRunning = true
  }
  stop(){
    if (!this.isRunning)
      return
    this.timeout_in_secs = this.calculateSecsLeft()
    this.timestampOnStart = null
    this.isRunning = false
  }
  reset(timeout_in_secs){
    this.isRunning = false
    this.timestampOnStart = null
    this.timeout_in_secs = this.initial_timeout_in_secs
  }
  calculateSecsLeft(){
    if (!this.isRunning)
      return this.timeout_in_secs
    var currentTimestamp = this.getTimestampInSecs()
    var secsGone = currentTimestamp - this.timestampOnStart
    return Math.max(this.timeout_in_secs - secsGone, 0)
  }
}

class TimerWidget{
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  construct(){
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
  mount(rootTag){
    if (this.timerContainer)
      this.unmount()

    // adds HTML tag to current page
    this.timerContainer = document.createElement('div')

    this.timerContainer.setAttribute("style",
      "height: 100px; position: fixed; z-index:999; " +
      "left: 40px; border: 4px solid green; border-radius: 15%; " +
      "font-size: 20px; margin: auto");

    this.timerContainer.innerHTML = TEMPLATE

    rootTag.insertBefore(this.timerContainer, rootTag.firstChild)

    this.minutes_element = this.timerContainer.getElementsByClassName('js-timer-minutes')[0]
    this.seconds_element = this.timerContainer.getElementsByClassName('js-timer-seconds')[0]
  }
  update(secsLeft){
    var minutes = Math.floor(secsLeft / 60);
    var seconds = secsLeft - minutes * 60;

    this.minutes_element.innerHTML = padZero(minutes)
    this.seconds_element.innerHTML = padZero(seconds)
  }
  unmount(){
    if (!this.timerContainer)
      return
    this.timerContainer.remove()
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
}


function main(){
  var timer = new Timer(TIMEOUT_IN_SECS)
  var timerWiget = new TimerWidget()
  var intervalId = null

  timerWiget.mount(document.body)

  function handleIntervalTick(){
    var secsLeft = timer.calculateSecsLeft()
    timerWiget.update(secsLeft);
    if (secsLeft === 0) {
      window.alert(getMotivationMessage());
      timer.stop();
      timer = new Timer(30*1000);
      timer.start();
    }
  }

  function handleVisibilityChange(){
    if (document.hidden) {
      timer.stop()
      clearInterval(intervalId)
      intervalId = null
    } else {
      timer.start()
      intervalId = intervalId || setInterval(handleIntervalTick, 300)
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  handleVisibilityChange()
}

// initialize timer when page ready for presentation
window.addEventListener('load', main)
