var formular = "";

/**
 * This function clear all the values
 * @param
 * @returns
 */
function clearScreen() {
    document.getElementById("result").value = "";
    document.getElementById("fom").innerHTML = "";
}

function displayformular(value) {
    formular+=value;
    document.getElementById("fom").innerHTML = formular;
}

/**
 *  This function display values
 * @param value
 * @returns
 */
function display(value) {
    displayformular(value);
    document.getElementById("result").value += value;
}

/**
 * This function evaluates the expression and returns result
 * @param
 * @returns
 */
function calculate() {
    var p = document.getElementById("result").value;
    var q = eval(p);
    document.getElementById("result").value = q;
}

/**
 * This function remove backspace
 * @param
 * @returns
 */
function backspace() {
    var back_space = document.getElementById('result');
    var i = back_space.value;
    if (i.length > 0) {
        i = i.substring(0, i.length - 1);
        back_space.value = i;
    }
}