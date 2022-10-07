// This function clear all the values
function clearScreen() {
    document.getElementById("result").value = "";
}

// This function display values
function display(value) {
    document.getElementById("result").value += value;
}

// This function evaluates the expression and returns result
function calculate() {
    var p = document.getElementById("result").value;
    var q = eval(p);
    document.getElementById("result").value = q;
}
// This function remove backspace
function backspace() {
    var back_space = document.getElementById('result');
    var i = back_space.value;
    if (i.length > 0) {
        i = i.substring(0, i.length - 1);
        back_space.value = i;
    }
}