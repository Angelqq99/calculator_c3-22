/*
ToDoList:
*/
const buttons = document.querySelectorAll('.buttons');
const input = document.querySelector('#display');
const operators = ['+', '-', '*', '/','%', '/-/', '÷'];
var memoryStorage = 0;
var isOperatorClicked = false;
var currentInput = ''; 
var firstInput = '';
var lastInput = '';
var tempInput = '';
var shownInput = '';
var mistakeCheck = 0;
var oper = '';
var timesClicked = 0;
var pointActive = false;
var overFlow = false;
var saveData = '';
var saveResult = '';
var resultDisplayed = false;
var a =0;
input.value = '0.';

function calculate(){
    try{
        if(lastInput === '' && isOperatorClicked === true){
            if(lastInput === '' && firstInput!=''){
                currentInput+= firstInput;
                console.log(currentInput);
                tempInput = firstInput;
            }else{
                currentInput += tempInput;
            }
        }
        if(firstInput === ''){
            if(lastInput === '')
            {
                if(saveResult != '' && tempInput != ''){
                    currentInput = saveResult + oper +tempInput;
                }else{
                    return;
                }
            }
            else{
                if(saveResult!=''){
                currentInput = saveResult + oper +lastInput;
                }else{
                    currentInput = '0' + oper +lastInput;
                    console.log(currentInput);
                }
            }
        }
        if(lastInput !='' && oper !='' && timesClicked >=2)
        {
            currentInput+= lastInput;
        }         // Обработка процента
         if (currentInput.includes('%')) {
            var t = parseFloat(firstInput) /100 *parseFloat(lastInput);
            console.log(t);
            if(oper!= ''){
                currentInput = firstInput + ' '+oper+' '+t;
            }
            else{
                currentInput = t;
            }
            console.log(currentInput);
            if (input.value.endsWith('.') && pointActive === true) {
                input.value = input.value.slice(0, -1);
            }
        }
        
        var result = eval(currentInput);
        console.log(currentInput);
        if(result > (10**16 - 1) || (result).length>=15 || currentInput === '0  /0' || currentInput ==='0/0') {
            tempInput = '';
            reset();
            input.value = '............';
            shownInput = '0';
            resultDisplayed = true;
            return;  
        }
        if(overFlow === true && tempInput != '')
        {
            result = parseInt(result);
            overFlow = false;
        }
        if (!Number.isInteger(result)) {
            let resultString = result.toString();
            let integerPartLength = resultString.split('.')[0].length; // Длина целой части
            let maxDecimalPlaces = 12 - integerPartLength; // Максимум знаков после запятой, чтобы общее количество было 12
            if (maxDecimalPlaces < 0) maxDecimalPlaces = 0; // Если целая часть уже превышает 12 знаков
            result = parseFloat(result.toFixed(maxDecimalPlaces)); // Округляем до вычисленного количества знаков
        }
        input.value = result+'.';
        console.log(result);
        if (input.value.endsWith('.') && !Number.isInteger(result) && result.toString().includes('.')) {    //!Number.isInteger(result)
            input.value = input.value.slice(0, -1);
            pointActive = true;
        }
        else{
            pointActive = false;
        }
        //|| (result.toString().replace('.', '').length >= 12 && result.toString().replace('.', '').length <= 15) || (currentInput).length>=15
        currentInput = result.toString();
        if (result > (10**12 - 1) && result <= (10**16 - 1))  {
            // result = parseInt(result);
             input.value = result.toString().slice(0, 12);
             overFlow = true;
             console.log(result); 
         }
        shownInput = result.toString();
        if(lastInput != ''){
            tempInput = lastInput;
        }
        resultDisplayed = true;
        saveResult = result.toString(); 
        firstInput = '';
        lastInput = '';
        shownInput = '0';
        currentInput = '';
        timesClicked = 0;
        isOperatorClicked = false;
    } catch(e) {
        input.value = 'Error';
        currentInput = '';
        shownInput = '';
    }
}

// Функция для проверки длины
function canAddToInput(value) {
    // Проверка, не превышает ли длина 12 символов
    return (shownInput + value).length <= 12;
}

function reset(){
    isOperatorClicked = false;
    currentInput = ''; 
    firstInput = '';
    lastInput = '';
    tempInput = '';
    shownInput = '';
    saveResult = '';
    saveData = '';
    mistakeCheck = 0;
    oper = '';
    timesClicked = 0;
    pointActive = false;
    overFlow = false;
    resultDisplayed = false;
    input.value = '0.';

}

//событие клика
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        var btnVal = this.innerHTML;
        console.log(btnVal);
        if(btnVal === '÷'){
                btnVal = '/';
                oper = '/';
        } 
        if(btnVal === '=') {
            mistakeCheck = 0;
            calculate();
        }
        // Очистка дисплея, добавить исправление ошибки ввода
        else if (btnVal === 'Cx'){
            if(isOperatorClicked === false){
                mistakeCheck = 0;
                reset();
            }
                else if (mistakeCheck === 0) {
                    mistakeCheck = 1;
                    isOperatorClicked = false;
                    if(lastInput === ''){
                        //currentInput = currentInput.slice(0,-2);
                        mistakeCheck = 0;
                        reset();
                    }
                    else{
                    lastInput = '';
                    shownInput = '';
                    timesClicked = 0;
                    input.value = '0.';
                    currentInput = currentInput.slice(0,-3);
                    }
                    
                }
                else{
                    mistakeCheck = 0;
                    reset();
                }
        }
        else if (btnVal === 'П+'){
            mistakeCheck = 0;
            if(isOperatorClicked)
            {
                memoryStorage += parseFloat(saveData);
            }
            else{
                if(saveResult=== ''){
                    memoryStorage += parseFloat(firstInput);
                }else{
                    memoryStorage += parseFloat(saveResult);
                }
            }
            console.log(memoryStorage);
           // reset();
        }
        else if (btnVal === 'ИП'){
            if(isOperatorClicked){
                console.log('1');
                lastInput = memoryStorage.toString();
                currentInput += memoryStorage.toString();
                input.value = memoryStorage+'.';
                if(saveResult.toString().includes('.')){
                        input.value = input.value.slice(0, -1);
                }
                mistakeCheck =0;
            }
            else{
            console.log('2');
            mistakeCheck = 0;
            input.value = memoryStorage+'.';
            currentInput = memoryStorage.toString();
            saveResult = memoryStorage.toString();
            shownInput = memoryStorage.toString();
            if(memoryStorage === 0){
                shownInput= '';
            }
            }
            console.log(shownInput);
            if (input.value.endsWith('.') && pointActive === true && shownInput.toString().includes('.')) {
                input.value = input.value.slice(0, -1);
            }
        }
        else if (btnVal === 'СП'){
            mistakeCheck = 0;
            memoryStorage = 0;
            //shownInput = '';
            console.log(memoryStorage);
        }
        // if( saveResult.toString().includes('.') && pointActive === false){
        //     pointActive = true;
        // }
        else if (btnVal === '/-/') {
            mistakeCheck = 0;
            if( saveResult.toString().includes('.') && pointActive === false){
                pointActive = true;
            }
            // Определяем, какое число нужно инвертировать
            if (!isOperatorClicked && firstInput !== '') {
                firstInput = (-parseFloat(firstInput)).toString();
                shownInput = firstInput;
            } else if (isOperatorClicked && lastInput !== '') {
                lastInput = (-parseFloat(lastInput)).toString();
                shownInput = lastInput;
            }else if(resultDisplayed){
                saveResult = (-parseFloat(saveResult)).toString();
                shownInput = saveResult;
            } 
            else {
                // Если числа нет, ничего не делаем
                return;
            }
        
            // Обновляем отображение и текущее выражение
            input.value = shownInput+'.';
            if (!isOperatorClicked) {
                currentInput = firstInput;
            } else {
                currentInput = firstInput + oper + lastInput;
            }
        
            if (input.value.endsWith('.') && pointActive === true && shownInput.toString().includes('.')) {
                input.value = input.value.slice(0, -1);
            }
        }
        
        // Операции
        else if (operators.includes(btnVal)){
            if(resultDisplayed){
                pointActive = false;
                resultDisplayed = false;
                if(saveResult.toString().includes('.')){
                    pointActive = true;
                }
            }
            if(btnVal != '%'){
                oper = btnVal;
            }  
            if(isOperatorClicked === true && btnVal!='%'){
                return;
            }
            timesClicked += 1;
            mistakeCheck = 0;
            isOperatorClicked = true;
            currentInput += ' ' + ' ' + btnVal;
            if(shownInput === ''){
                shownInput = firstInput;
                if(shownInput==='' && firstInput===''){
                    shownInput = '0';
                }
            }
            input.value = shownInput+'.';
            if(firstInput=== ''){
                input.value = saveResult+'.';
            }
            if(saveResult.toString().includes('.'))
                {
                    input.value = input.value.slice(0, -1);
                }
            if ((input.value.endsWith('.') || pointActive === true) && shownInput.toString().includes('.')) {
                input.value = input.value.slice(0, -1);
            }
            pointActive = false;
            saveData = shownInput;
            shownInput = '';
            // if(oper === '/' && overFlow === true){
            //     input.value = currentInput.toString().replace('.', '').slice(0, 12);
            // }
        }
        else if(btnVal === '.')
        {
            if (resultDisplayed) {
                resultDisplayed = false; 
                pointActive = true;   
                shownInput = '0.';
                currentInput = '0.';
                input.value = shownInput;
                return;
            }
            if (!shownInput.includes('.')) {  // Проверка на наличие точки
                if(shownInput === ''){
                    shownInput='0';
                }
                pointActive = true;
                shownInput += btnVal;
                currentInput += btnVal;
                input.value = shownInput+'.';
                if(!operators.some(op1 => currentInput.includes(op1))){
                    firstInput += btnVal;
                } 
                if (operators.some((op) => currentInput.includes(op))) {
                    lastInput += btnVal;
                  }
            }
            if ((input.value.endsWith('.') || pointActive === true) && shownInput.toString().includes('.')) {
                input.value = input.value.slice(0, -1);
            }
        }
        //Добавляем введенное значение
        else {
            mistakeCheck = 0;

            // Если результат уже был отображён, сбрасываем shownInput
            if (resultDisplayed) {
                shownInput = '';
                resultDisplayed = false; // Сбрасываем флаг
            }

            if(!isOperatorClicked){
                if(canAddToInput(btnVal)){
                    if(!operators.some(op1 => currentInput.includes(op1))){
                        if(shownInput === '' && btnVal === '0'){
                            return;
                        }
                        firstInput += btnVal;
                    } 
                    shownInput += btnVal;
                    currentInput += btnVal;
                    input.value = shownInput+'.';
                }
            }
            else{
              if (canAddToInput(btnVal)) {
                if (operators.some((op) => currentInput.includes(op))) {
                    if (lastInput ==='0'){
                        return
                    }
                  lastInput += btnVal;
                }
                shownInput += btnVal;
                currentInput += btnVal;
                input.value = shownInput+'.';
              }
            }
            console.log(shownInput);
            if (input.value.endsWith('.') && pointActive === true ) {
                input.value = input.value.slice(0, -1);
            }
        }
    });
});
