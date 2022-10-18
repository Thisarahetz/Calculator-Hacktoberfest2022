import { scientific } from "./calculate.js";
const lightTheme = "styles/light.css";
const darkTheme = "styles/dark.css";
const sunIcon = "assets/SunIcon.svg";
const moonIcon = "assets/MoonIcon.svg";
const themeIcon = document.getElementById("theme-icon");
const res = document.getElementById("result");
const toast = document.getElementById("toast");

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

let input = document.querySelectorAll("input");
input.forEach((e) => {
  e.addEventListener("click", (e) => {
    let val = e.target.value;
    let id = e.target.id;
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
});

document.querySelector(".theme-button").addEventListener('click',()=>{
  changeTheme();
})
// Swaps the stylesheet to achieve dark mode.
function changeTheme() {
  const theme = document.getElementById("theme");
  setTimeout(() => {
    toast.innerHTML = "Calculator";
  }, 1500);
  if (theme.getAttribute("href") === lightTheme) {
    theme.setAttribute("href", darkTheme);
    themeIcon.setAttribute("src", sunIcon);
    toast.innerHTML = "Dark Mode 🌙";
  } else {
    theme.setAttribute("href", lightTheme);
    themeIcon.setAttribute("src", moonIcon);
    toast.innerHTML = "Light Mode ☀️";
  }
}

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
  console.log(e);
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
    "("
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
    if(e.shiftKey) res.value="";
    else
      res.value = resultInput.substring(0, res.value.length - 1);
  } else if (validKeys.includes(k)) {
    //grabbing the liveScreen
    res.value += String(e.key);
  }
}