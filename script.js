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
    return result;
}

let operator = ""; 
let currentNumber = ""; //The current number being inputted by user
let answer = NaN; //The answer of the previous equation

let screen = document.querySelector(".calculator-screen");
let operatorButtons = document.querySelectorAll(".operator");
let numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((numberButton) => 
    numberButton.addEventListener("click", () => updateScreen(numberButton.value)));

function updateScreen(number){
    currentNumber += number; //string
    screen.value = twelveDigit(currentNumber);
}

operatorButtons.forEach((operatorButton) => 
    operatorButton.addEventListener("click", function(e){
        input = e.target.value;
        console.log(input);
        updateValues(input);
    })); 

function updateValues(input){
    
    if (operator === "/" && currentNumber == 0){ //prevent division by zero
        alert("Don't divide by zero, dummy.");
        clearAll();
        return;
    }
    if (operator === "" || operator === "="){ 
        answer = Number(screen.value); //if it's the beginning of a new equation, the answer is simply what's already on screen
        //screen.value has to be used here instead of currentNumber, because currentNumber is reset later (which would cause 'undefined' if equals is pressed twice)
    } else{
        answer = operate(operator, answer, Number(currentNumber));
    }
    operator = input;
    screen.value = twelveDigit(answer);
    currentNumber = "";
}

function twelveDigit(number){ //Make sure no more than 12 digits (including decimal) are ever displayed, to prevent overflowing numbers
    number = Number(number); //ensure it's a number type
    numberString = String(number);

    if (numberString.length <= 12) return number;

    if (number % 1 !== 0){ //if number has decimals
        let digitsBeforeDecimal = numberString.indexOf('.');
        let spaceLeft = 11 - digitsBeforeDecimal;
        numberString = number.toFixed(spaceLeft);
        return Number(numberString);
    }

    numberString = numberString.substr(0,12);
    return Number(numberString);
}

let clearButton = document.querySelector(".all-clear");
clearButton.addEventListener("click", clearAll);

function clearAll(){
    operator = ""; 
    currentNumber = "";
    answer = NaN;
    screen.value = "0";
}

let backspace = document.querySelector(".backspace");
backspace.addEventListener("click", undo);

function undo(){
    if (currentNumber.length == 0) return;
    currentNumber = currentNumber.slice(0,currentNumber.length - 1);
    screen.value = currentNumber;
}

//Keyboard input

document.addEventListener("keydown", function(event){
    let numberKeys = ['0','1','2','3','4','5','6','7','8','9'];
    let operatorKeys = ['+','-','*','/','='];
    if (numberKeys.includes(event.key)){
        updateScreen(event.key);
    }
    if (operatorKeys.includes(event.key)){
        updateValues(event.key);
    }
    if (event.key === "Backspace"){
        undo();
    }
    if (event.key === "."){
        updateScreen(".");
    }
    if (event.key === "Escape"){
        clearAll();
    }
});