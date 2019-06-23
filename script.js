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

function updateValues(keyPressed){
    
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
    if (keyPressed === undefined){
        operator = this.value; //only works if operator button is clicked on with mouse
    } else operator = keyPressed; //works if a keyboard operator key is pressed
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
    if (event.key === "Enter"){
        updateValues("=");
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