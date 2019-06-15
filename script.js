function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, num1, num2){
    switch (operator){
        case "+":
            add(num1, num2);
            break;
        case "-":
            subtract(num1, num2);
            break;
        case "*":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);
            break;
    }
}

let screen = document.querySelector(".calculator-screen");
let displayValue = "";

function updateScreen(number){
    displayValue += number;
    screen.value = displayValue;
}

let numberButtons = document.querySelectorAll(".number");

for (const numberButton of numberButtons){
    numberButton.addEventListener("click", function(){
        updateScreen(button.value);
    });
}