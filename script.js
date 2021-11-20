function add(num1, num2){
    return(num1+num2)
}

function subtract(num1, num2){
    return(num1-num2)
}

function multiply(num1, num2){
    return(num1*num2)
}

function divide(num1, num2){
    if(num2 != 0){
        return( num1 / num2)
    }
    else{
        return('Cannot Divide By 0')
    }
}

/**
 * @param {*} operator - One of the four operators +, -, *, /
 * @param {*} num1 - Any rational value
 * @param {*} num2 - Any rational value
 * @returns the result of num1 $ num2, where $ is the operator chosen
 */

function operate(operator, num1, num2){
    let result
    switch( operator ){
        case '+':
            result = add(num1, num2)
            break;
        case '-':
            result = subtract(num1, num2)
            break;
        case '*':
            result = multiply(num1, num2)
            break;
        case '/':
            result = divide(num1, num2)
            break;
    }
    return( result )
}

function turnOnButtons() {
    addEventListener( 'click', function (e) {
        populateDisplay(e.target.id)
    })
}

function populateDisplay(displayValue){
    let display = document.getElementById('screen')
    if(displayValue === 'clear'){
        clearScreen(display)
        resetCalc()
    }
    else if(displayValue == '.'){
        if (display.textContent.includes('.')){

        }
        else {
            display.textContent += displayValue
        }
    }
    else if(displayValue =='+' || displayValue =='-' || displayValue =='*' || displayValue =='/'){
        if(storedVals.operator === ''){
            saveValues(display.textContent, displayValue)
            clearScreen(display)
            console.log(storedVals)
        }
        else{
            console.log('This case should evaluate what we have so far')
        }
    }
    else if(displayValue === '='){
        storeSecond(display.textContent)
        evaluate(display)
    }
    else{
        display.textContent += displayValue
    }
}

function clearScreen(display){
    display.textContent = ''
}

function resetCalc(){
    storedVals.first = NaN
    storedVals.second = NaN
    storedVals.operator = ''
}

function saveValues(val1, operation){
    storedVals.first = parseFloat(val1)
    storedVals.operator = operation
}

function storeSecond(val2){
    storedVals.second = parseFloat(val2)
}

function evaluate(display){
    display.textContent = operate(storedVals.operator, storedVals.first, storedVals.second)
}

let storedVals = {
    first: NaN,
    second: NaN,
    operator: ''
}

turnOnButtons()

