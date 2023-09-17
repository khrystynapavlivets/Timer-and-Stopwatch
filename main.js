/*
повернути поточну дату в форматі: день.місяць.рік
повернути поточний час в форматі: година:хвилина:секунда
розробити секундомір в якого є можливість запуску, паузи, запам’ятовування поточного часу та скидування часу(мілісекунди не обов’язково реалізовувати)
розробити таймер в якого є можливість визначення часового проміжку, а також запуск, пауза ти скидування часу
-------------------------------------------------------------------
*/
/////////////////////////////
//       CURRENT TIME
/////////////////////////////
"use strict";

setInterval(() => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  let day = currentDate.getDate();
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let second = currentDate.getSeconds();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  if (second < 10) second = "0" + second;
  document.querySelector(".date").textContent = `${day}.${month}.${year}`;
  document.querySelector(
    ".time"
  ).textContent = `${hour} : ${minute} : ${second}`;
});

////////////////////////////////
//          STOPWATCH
////////////////////////////////
let hour = document.querySelector(".hour");
let minute = document.querySelector(".minute");
let second = document.querySelector(".second");
let millisecond = document.querySelector(".millisecond");

let startStopwatch = document.querySelector("#startStopwatch");
let saveTime = document.querySelector("#saveTime");
let pauseStopwatch = document.querySelector("#pauseStopwatch");
let resetStopwatch = document.querySelector("#resetStopwatch");

let resultSavedTimes = document.querySelector(".resultSavedTimes");

let hr = 0,
  min = 0,
  sec = 0,
  msec = 0,
  stopwatchIsRunning = false,
  interval;

function tick() {
  millisecond.textContent =
    msec < 100 ? (msec < 10 ? "00" + msec : "0" + msec) : msec;
  if ((msec += 4) == 1000) {
    msec = 0;
    sec++;
    second.textContent = sec < 10 ? "0" + sec : sec;
    if (sec >= 60) {
      sec = 0;
      min++;
      minute.textContent = min < 10 ? "0" + min : min;

      if (min >= 60) {
        min = 0;
        hr++;
        hour.textContent = hr < 10 ? "0" + hr : hr;
      }
    }
  }
}

function start() {
  if (!stopwatchIsRunning) {
    clearInterval(interval);
    interval = setInterval(tick, 1);
    stopwatchIsRunning = true;
  }
}

function pause() {
  clearInterval(interval);
  stopwatchIsRunning = false;
}
function reset() {
  clearTimeout(interval);
  (hr = 0), (min = 0), (sec = 0), (msec = 0), (hour.textContent = "00");
  minute.textContent = "00";
  second.textContent = "00";
  millisecond.textContent = "000";
  stopwatchIsRunning = false;
}

function loop() {
  if (resultSavedTimes.children.length >= 4) {
    resultSavedTimes.removeChild(resultSavedTimes.children[0]);
  }
  const timeElement = document.createElement("p");
  timeElement.textContent = `${hour.textContent}:${minute.textContent}:${second.textContent}:${millisecond.textContent}`;
  resultSavedTimes.appendChild(timeElement);
}

startStopwatch.addEventListener("click", start);
pauseStopwatch.addEventListener("click", pause);
saveTime.addEventListener("click", loop);
resetStopwatch.addEventListener("click", reset);

///////////////////////////////////////////////
//                 TIMER
///////////////////////////////////////////////

const getS = (selector) => document.querySelector(selector);

let timersID;
let minutes = getS(".minutes").innerHTML;
let seconds = 0;
let check = true;
let x = getS(".changeMins").innerHTML;

function returnData(zero) {
  return zero >= 10 ? zero : `0${zero}`;
}
function decreaseMins() {
  if (x > 1) {
    getS(".changeMins").textContent = x - 1;
    x--;
  }
}
function increaseMins() {
  if (x > 0) {
    getS(".changeMins").textContent = x + 1;
    x++;
  }
}

getS("#startTimer").onclick = function () {
  if (check) {
    getS(".minutes").innerHTML = ` ${returnData(
      getS(".changeMins").textContent
    )}`;
  }
  startCountdown();
  getS("#startTimer").disabled = true;
  getS("#resetTimer").disabled = true;
  getS("#pauseTimer").disabled = false;
  getS(".increaseMins").disabled = true;
  getS(".decreaseMins").disabled = true;
};

getS("#pauseTimer").onclick = function () {
  clearTimeout(timersID);
  check = false;
  getS("#startTimer").disabled = false;
  getS("#resetTimer").disabled = false;
  getS("#pauseTimer").disabled = true;
};

getS("#resetTimer").onclick = function () {
  getS(".minutes").innerHTML = "00";
  getS(".seconds").innerHTML = "00";
  check = true;
  getS(".increaseMins").disabled = false;
  getS(".decreaseMins").disabled = false;
};

function startCountdown() {
  minutes = getS(".minutes").innerHTML;
  timersID = setTimeout(function () {
    seconds--;

    if (seconds == 0 && minutes == 0) {
      getS(".seconds").innerHTML = "00";
      check = true;
      return;
    }
    if (seconds < 0) {
      seconds = 59;
      if (minutes >= 0) {
        minutes--;
      }
      getS(".minutes").innerHTML = `${returnData(minutes)}`;
    }
    getS(".seconds").innerHTML = `${returnData(seconds)}`;

    startCountdown();
  }, 1000);
}

///////////////////////////////////



// const getS = (selector) => document.querySelector(selector);

// let check = true;
// let countdownInterval;
// let mm = getS(".minutes").textContent;
// let ss = getS(".seconds").textContent;
// let mins = getS(".changeMins").textContent;

// function updateMinsDisplay() {
//   getS(".changeMins").textContent = mins;
// }
// function increaseMins() {
//   mins++;
//   updateMinsDisplay();
// }
// function decreaseMins() {
//   if (mins > 1) {
//     mins--;
//     updateMinsDisplay();
//   }
// }

// function startCountdown() {
//   getS("#startTimer").disabled = true;
//   getS("#resetTimer").disabled = false;
//   getS("#pauseTimer").disabled = false;
//   getS(".increaseMins").disabled = false;
//   getS(".decreaseMins").disabled = false;
//   getS(".minutes").textContent = String(mins).padStart(2, "0");

//     countdownInterval = setInterval(() => {
//       getS(".seconds").innerHTML--;
//       if (
//         getS(".minutes").innerHTML == 0 &&
//         getS(".seconds").innerHTML == "01"
//       ) {
//         getS(".seconds").innerHTML = "00";
//         getS(".minutes").innerHTML = "00";
//         clearInterval(countdownInterval);
//         return;
//       }
//       if (getS(".seconds").innerHTML <= 0) {
//         getS(".minutes").innerHTML--;
//         getS(".seconds").innerHTML = 59;
//       }
//     }, 1000);
  

// }

// function pauseCountdown() {
//   clearInterval(countdownInterval);
//   getS("#startTimer").disabled = false;
//   getS("#resetTimer").disabled = false;
//   getS("#pauseTimer").disabled = true;
//     check = true;
// }



// function resetCountdown() {
//   clearInterval(countdownInterval);
//   getS(".seconds").innerHTML = "00";
//   getS(".minutes").innerHTML = "00";
//   check = true;
//   getS("#startTimer").disabled = false;
//   getS("#resetTimer").disabled = false;
//   getS("#pauseTimer").disabled = true;
//   getS(".increaseMins").disabled = false;
//   getS(".decreaseMins").disabled = false;
// }



// getS("#startTimer").addEventListener("click", startCountdown);

// getS("#pauseTimer").addEventListener("click", pauseCountdown);

// getS("#resetTimer").addEventListener("click", resetCountdown);
