let elements = {
  root: document.querySelector(".root"),
  inputTime: document.querySelector(".inputTime input"),
  fastStart: document.querySelector(".fastStart"),
  lastStart: document.querySelector(".lastStart"),
  showTime: document.querySelector(".showTime .showTimeContainer"),
  start_stop: document.querySelector(".start_stop"),
  startStopBtn: document.querySelector(".start_stop button span b"),
  startStopBtn1: document.querySelector(".start_stop button"),
};
let totalMinutes = 0;
let totalSeconds = 0;
let closeInterval1 = null;
let startStopBtnText = "START";
elements.lastStart.addEventListener("click",()=>{
console.log("start buttom is clicked")
   if(closeInterval1 === null){
     oneMinute(5)
   }
})

elements.fastStart.addEventListener("click", () => oneMinute(elements.inputTime.value));

function oneMinute(value) {
  document.querySelector(".showWarning").innerHTML = "";

  let userValue = value
  if (1 <= userValue && 500 >= userValue) {
    if (closeInterval1 !== null) {
      clearInterval(closeInterval1);
      totalMinutes = 0;
    }

    totalMinutes = userValue;
    totalSeconds = 0;
    startStopBtnText = "STOP";

    elements.startStopBtn.innerHTML = startStopBtnText;
    let showUpdateTime = () =>
      (elements.showTime.innerHTML = `<span>${totalMinutes}:${totalSeconds}</span>`);
    showUpdateTime();
    function runningMnt() {
      setTimeout(() => {
        totalMinutes--;
        totalSeconds = 59;
        
        showUpdateTime();
        function startStop() {
          closeInterval1 = setInterval(() => {
            totalSeconds--;
            function click() {
              elements.startStopBtn1.addEventListener("click", () => {
                if (startStopBtnText === "STOP") {
                  clearInterval(closeInterval1);
                  startStopBtnText = "START";
                  elements.startStopBtn.innerHTML = startStopBtnText;
                  showUpdateTime();
                }
                elements.startStopBtn1.addEventListener("click", () => {
                  if (startStopBtnText === "START") {
                    startStopBtnText = "STOP";
                    elements.startStopBtn.innerHTML = startStopBtnText;

                    clearInterval(closeInterval1);

                    console.log("hey ok");
                    startStop();
                  }
                });
              });
            }
            click();
            showUpdateTime();
            if (totalSeconds == -0) {
              totalMinutes--;
              totalSeconds = 60;

              if (totalMinutes == -1) {
                elements.showTime.innerHTML = `<span>0:0</span>`;
                clearInterval(closeInterval1);
              }
            }
          }, 1000);
        }
        startStop();
      }, 1000);
      closeInterval1  =undefined
    }

    runningMnt();
  } else {
    document.querySelector(".showWarning").innerHTML =
      "Write the number between 1 and 500!";
  }
}

