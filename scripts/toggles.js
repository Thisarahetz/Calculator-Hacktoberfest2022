// toggle.js features all the toggleable functions of the calculator
// currently it has dark/light mode toggle and scientific-functions switch
const lightTheme = "styles/light.css";
const darkTheme = "styles/dark.css";
const sunIcon = "assets/SunIcon.svg";
const moonIcon = "assets/MoonIcon.svg";
const themeIcon = document.getElementById("theme-icon");

// Swaps the stylesheet to achieve dark mode.
export function changeTheme() {
  const theme = document.getElementById("theme");
  console.log(theme);
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

const toggleScientific = document.querySelector(".toggle-scientific");

export function switchScientific() {
  try {
    let rows = [
      document.querySelector(".second-row"),
      document.querySelector(".third-row"),
      document.querySelector(".fourth-row"),
      document.querySelector(".fifth-row"),
    ];
    if (toggleScientific.name == "off") {
      let makeButton = (tag, type, value,id) => {
        let ele = document.createElement(tag);
        ele.type = type;
        ele.value = value;
				ele.id = id;
        return ele;
      };
      let scientificButtons = [
        makeButton("input", "button", "(","btn-openbrac"),
        makeButton("input", "button", ")","btn-closebrac"),
        makeButton("input", "button", "^","btn-raisepow"),
        makeButton("input", "button", "√","btn-sqrt"),
      ];
      let i = 0;
      rows.forEach((row) => {
        console.log(row);
        row.insertBefore(scientificButtons[i], row.firstChild);
        i++;
      });
      toggleScientific.name = "on";
    } else {
      rows.forEach((row) => {
        row.removeChild(row.firstChild);
      });
      toggleScientific.name = "off";
    }
  } catch (error) {
    console.log(error);
  }
}
