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
    let result;
    switch (operator){
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }
    //memory = ""; 
    return result;
}

let operator = ""; 
let currentNumber = "";
let answer = NaN;

let screen = document.querySelector(".calculator-screen");
let operatorButtons = document.querySelectorAll(".operator");
let numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((numberButton) => 
    numberButton.addEventListener("click", () => updateScreen(numberButton.value)));

function updateScreen(number){
    currentNumber += number; //string
    screen.value = currentNumber;
}

operatorButtons.forEach((operatorButton) => 
    operatorButton.addEventListener("click", updateValues)); 

function updateValues(){
    
    if (operator === "/" && currentNumber == 0){ //prevent division by zero
        alert("Don't divide by zero, dummy.");
        clearAll();
        return;
    }
    if (operator === "" || operator === "="){ 
        answer = Number(screen.value); //if it's the beginning of a new equation, the answer is simply what's already on screen
    } else{
        answer = operate(operator, answer, Number(currentNumber));
    }
    if (answer.toString().length > 12){ //prevent answers from being longer than 12 digits
        answer = answer.toString().substr(0,12);
        answer = Number(answer);
    }
    screen.value = answer;
    operator = this.value; 
    currentNumber = "";
}

let equalsButton = document.querySelector(".equal-sign");
equalsButton.addEventListener("click", updateValues);

let clearButton = document.querySelector(".all-clear");
clearButton.addEventListener("click", clearAll);

function clearAll(){
    operator = ""; 
    currentNumber = "";
    answer = NaN;
    screen.value = "0";
}