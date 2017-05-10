/**
 * Created by jessedavila on 10/17/16.
 */

var left = document.getElementById('leftNumberDisplay');
var operand = document.getElementById('operandDisplay');
var right = document.getElementById('rightNumberDisplay');
var historytext = document.getElementById('text');
var operation = 0;
var refresh = false;
var buttons = document.getElementsByClassName('btn');

for (var i = 0; buttons.length > i; i++) {
    buttons[i].addEventListener('click', populate, false);
}

function populate() {
    var selected = this;
    refreshDisplay(refresh, selected);
    toNegative(selected);
    if (!isNaN(selected.innerHTML) || selected.innerHTML == '.') { /*if it's a number or a point, place it appropriately*/
        if (operand.innerHTML == '') {
            left.innerHTML += selected.innerHTML;
        } else if (operand.innerHTML !== '') {
            right.innerHTML += selected.innerHTML;
        }
    } else if (isNaN(selected.innerHTML) && selected.innerHTML !== '+/-') { /*if it's not a number, add it to the operand section and perform the operate function*/
        if (left.innerHTML !== '') {
            operand.innerHTML = selected.innerHTML;
            operate(selected.innerHTML);
        } else if (left.innerHTML == '') {
            alert('pick a number first');
            clearDisplay(selected);
        }
    }
}

function operate() { //this determines how or when to calculate, or to clear
    if (operand.innerHTML == '+') {
        operation = 1;
    } else if (operand.innerHTML == '-') {
        operation = 2;
    } else if (operand.innerHTML == '*') {
        operation = 3;
    } else if (operand.innerHTML == '/') {
        operation = 4;
    } else if (operand.innerHTML == '=' && right.innerHTML !== '') {
        calculate(operation);
    } else if (operand.innerHTML == 'ac') {
        clearDisplay();
    } else {
        alert("uhhh, there might be some sort of error going on here...");
    }
}

function calculate(operation) { // finds operator number and performs operation on left and right variables.
    var i = 0;
    logHistory(operation);
    if (operation == 1) {
        right.innerHTML = parseFloat(left.innerHTML) + parseFloat(right.innerHTML);
        clearDisplay(operation);
    } else if (operation == 2) {
        right.innerHTML = parseFloat(left.innerHTML) - parseFloat(right.innerHTML);
        clearDisplay(operation);
    } else if (operation == 3) {
        right.innerHTML = parseFloat(left.innerHTML) * parseFloat(right.innerHTML);
        clearDisplay(operation);
    } else if (operation == 4) {
        if (right.innerHTML == 0) {
            alert("don't do that");
            clearDisplay();
        } else {
            right.innerHTML = parseFloat(left.innerHTML) / parseFloat(right.innerHTML);
            clearDisplay(operation);
        }
    } else {
        alert('error');
    }
    logHistory();
    refresh = true;
}

function clearDisplay(operation) {
    if (operation) {
        left.innerHTML = '';
    } else {
        left.innerHTML = '';
        right.innerHTML = '';
        operand.innerHTML = '';
    }
}

function refreshDisplay(resetDisplay, number) {
    if (resetDisplay && isNaN(number.innerHTML)) {
        left.innerHTML = right.innerHTML;
        right.innerHTML = '';
    } else if (resetDisplay) {
        clearDisplay();
    }
    refresh = false;
}

function toNegative(specialKey) {
    if (specialKey.innerText == '+/-') {
        if (right.innerHTML == '') {
            left.innerHTML *= -1;
        } else if (right.innerHTML !== '') {
            right.innerHTML *= -1;
        }
    }
}

function logHistory(operand) {
    if (i % 2 == 0) {
        if (operand == 1) {
            historytext.innerHTML += left.innerHTML + " + " + right.innerHTML;
        }
        if (operand == 2) {
            historytext.innerHTML += left.innerHTML + " - " + right.innerHTML;
        }
        if (operand == 3) {
            historytext.innerHTML += left.innerHTML + " * " + right.innerHTML;
        }
        if (operand == 4) {
            historytext.innerHTML += left.innerHTML + " / " + right.innerHTML;
        }
    } else {
        historytext.innerHTML += ' = ' + right.innerHTML + '<br>';
    }
    i++;
}