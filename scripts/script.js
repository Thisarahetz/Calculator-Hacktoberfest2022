import { scientific } from "./calculate.js";
import { switchScientific, changeTheme } from "./toggles.js";

const res = document.getElementById("result");
const toggleScientific = document.querySelector(".toggle-scientific");
const themeButton = document.querySelector(".theme-button");
const hasEventListener= {};
themeButton.addEventListener("click", () => {
  changeTheme();
});

function calculate(value) {
  let calculatedValue = NaN;
  if (value != "") calculatedValue = scientific(value);
  if (isNaN(calculatedValue)) {
    if (value !== "") res.value = "Invalid Expression";
    setTimeout(() => {
      res.value = "";
    }, 1300);
  } else {
    res.value = calculatedValue;
  }
}

function mapButtons() {
  let input = document.querySelectorAll("input");
  input.forEach((ele) => {
    try {
      let val = ele.value;
      let id = ele.id;
      if(!hasEventListener[id]){
        ele.addEventListener("click", (e) => {
          if (
            id !== "calc" &&
            id !== "clear-button" &&
            id !== "result" &&
            id !== "del-button"
          )
            liveScreen(val);
          else if (id === "calc") {
            calculate(res.value);
          } else if (id === "clear-button") res.value = "";
          else if (id === "del-button") {
            const resultInput = res.value;
            //remove the last element in the string
            res.value = resultInput.substring(0, res.value.length - 1);
          }
        });
        hasEventListener[id] = true;
      }
    } catch (error) {
      console.log("element does not exist");
    }
  });
  console.log(hasEventListener);
}
mapButtons();

toggleScientific.addEventListener("click", () => {
  switchScientific();
  mapButtons();
});

// Displays entered value on screen.
function liveScreen(enteredValue) {
  if (!res.value) {
    res.value = "";
  }
  res.value += enteredValue;
}
//adding event handler on the document to handle keyboard inputs
document.addEventListener("keydown", keyboardInputHandler);
//function to handle keyboard inputs
function keyboardInputHandler(e) {
  // to fix the default behavior of browser, enter and backspace were causing undesired behavior when some key was already in focus.
  e.preventDefault();
  let k = e.key;
  let validKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "^",
    ")",
    "(",
  ];
  //press enter to see result
  if (k === "Enter") {
    // calculate(result.value);
    calculate(result.value);
  }
  //backspace for removing the last input
  else if (k === "Backspace") {
    const resultInput = res.value;
    //remove the last element in the string
    if (e.shiftKey) res.value = "";
    else res.value = resultInput.substring(0, res.value.length - 1);
  } else if (validKeys.includes(k)) {
    //grabbing the liveScreen
    res.value += String(e.key);
  }
}
