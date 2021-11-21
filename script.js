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
        return( num1 / num2 )
    }
    else{
        return(`¯\\_(ツ)_/¯`)
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
    if(isNaN(num2) || isNaN(num1)) result = 0
    else{
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
    }
    if(typeof(result) === 'number'){
        result = Math. round(1000*result)/1000
        if( result.toString().length > 11 )
            result = "Overflow"
        return( result )
        
    }
    else return(result)
}

function turnOnCalculator() {
    addEventListener( 'click', function (e) {
        populateDisplay(e.target.id)
    })
}

function populateDisplay(displayValue){
    let display = document.getElementById('screen')

    if ( displayValue == 'clear'){              //clears the screen
        display.textContent = ''
        resetCalc()

    }

    else if(displayValue == 'screen'){
    }

    else if(displayValue =='+'                  //when operator pressed
            || displayValue =='-' 
            || displayValue =='*' 
            || displayValue =='/'){
      
        storedVals.currentStatus = 'input'

        if(isNaN(storedVals.first)){
            saveFirst(display.textContent)
            saveOperator(displayValue)
        //    clearScreen(display)
        }
        
        else{
            saveSecond(display.textContent)
            display.textContent = evaluate()
            saveFirst(display.textContent)
            saveOperator(displayValue)
        }
 
    }

    else if(displayValue == '='){
        saveSecond(display.textContent)
        display.textContent = evaluate()
        saveFirst(NaN)
        saveSecond(NaN)
        storedVals.currentStatus = 'input'
    }

    else {
        if(storedVals.currentStatus == 'input'){
            clearScreen(display)
            storedVals.currentStatus = 'waiting'
            if( display.textContent.length < 11)
                display.textContent += displayValue
        }
        else if(displayValue == '.'){
            if( display.textContent.includes('.')){

            }
            else display.textContent += displayValue
        }
        else {
            if( display.textContent.length < 11)
                display.textContent += displayValue
        }
    }
}

function clearScreen(display){
    display.textContent = ''
}

function resetCalc(){
    storedVals.first = NaN
    storedVals.second = NaN
    storedVals.result = NaN
    storedVals.operator = ''
}

function saveFirst(value){
    storedVals.first = parseFloat(value)
}

function saveSecond(value){
    storedVals.second = parseFloat(value)
}

function saveOperator(value){
    storedVals.operator = value
}

function evaluate(){
    storedVals.result = operate(storedVals.operator, storedVals.first, storedVals.second)
    return storedVals.result
}

function clearRAM(){
    storedVals.first = NaN
    storedVals.second = NaN
}


let storedVals = {
    first: NaN,
    second: NaN,
    result: NaN,
    operator: '',
    currentStatus: 'waiting'
}

turnOnCalculator()

