function operate(operator, num1, num2){
    let answer;
    switch (operator){
        case "+":
            answer = num1 + num2;
            break;
        case "-":
            answer = num1 - num2;
            break;
        case "*":
            answer = num1 * num2;
            break;
        case "/":
            answer = num1 / num2;
            break;
    }
    displayValue = "";
    return answer;
}

let screen = document.querySelector(".calculator-screen");
let displayValue = "";

let numberButtons = document.querySelectorAll(".number");
for (const numberButton of numberButtons){
    numberButton.addEventListener("click", () => updateScreen(numberButton.value));
}

function updateScreen(number){
    displayValue += number;
    screen.value = displayValue;
}

let firstNumber = NaN;
let secondNumber = NaN;
let operator = "";

let operatorButtons = document.querySelectorAll(".operator");
for (const operatorButton of operatorButtons){
    operatorButton.addEventListener("click", updateValues);
}

let equalsButton = document.querySelector(".equal-sign");
equalsButton.addEventListener("click", function(){
    secondNumber = Number(displayValue);
    let answer = operate(operator, firstNumber, secondNumber);
    updateScreen(answer);
    firstNumber = NaN;
    secondNumber = NaN;
    displayValue = answer;
});

function updateValues(){
    if (Number.isNaN(firstNumber)) {
        firstNumber = Number(displayValue);
    } else { 
        firstNumber = operate(operator, firstNumber, Number(displayValue));
        screen.value = firstNumber;
    }
    displayValue = "";
    //updateScreen(firstNumber);
    operator = this.value; //the value of the operator button which called the function
}