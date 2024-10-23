const buttons = document.querySelectorAll('.buttons');
const input = document.querySelector('#display');
const operators = ['+', '-', '*', '/','%', '|-|'];
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
input.value = '0.';
function calculate(){
    try{
        if(lastInput === '' && isOperatorClicked === true){
            currentInput += tempInput;
        }
        if(lastInput !='' && oper !='' && timesClicked >=2)
        {
            currentInput+= lastInput;
        }         // Обработка процента
         if (currentInput.includes('%')) {
            var t = parseFloat(firstInput) /100 *parseFloat(lastInput);
            if(oper!= ''){
                currentInput = firstInput + ' '+oper+' '+t;
            }
            else{
                currentInput = t;
            }
            console.log(currentInput);
        }
        //currentInput = currentInput.replace(/,/g, '.');
        var result = eval(currentInput);
        if(result > (10**16 - 1) || (result).length>=15) {
            tempInput = '';
            reset();
            input.value = '............';
            return;  
        }

        input.value = result+'.';
        if (input.value.endsWith('.') && pointActive === true && !Number.isInteger(result) ) {
            input.value = input.value.slice(0, -1);
        }
        else{
            pointActive = false;
        }
        if ((result > (10**12 - 1) && result <= (10**16 - 1)) || (result.toString().replace('.', '').length >= 12 && result.toString().replace('.', '').length <= 15)) {
            console.log(result); 
            return;
        }

        currentInput = result.toString();
        shownInput = result.toString();
        if(lastInput != ''){
            tempInput = lastInput;
        }
        firstInput = '';
        lastInput = '';
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
    mistakeCheck = 0;
    oper = '';
    timesClicked = 0;
    pointActive = false;
    input.value = '0.';

}

//событие клика
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        var btnVal = this.innerHTML;

        if(btnVal === '=') {
            mistakeCheck = 0;
            calculate();
        }
        // Очистка дисплея, добавить исправление ошибки ввода
        else if (btnVal === 'Cx'){
            // if(isOperatorClicked === false){
            //     mistakeCheck = 0;
            //     reset();
            // }
            //     else if (mistakeCheck === 0) {
            //         mistakeCheck = 1;
            //         isOperatorClicked = false;
            //         if(lastInput === ''){
            //             currentInput = currentInput.slice(0,-2);
            //         }
            //         else{
            //         lastInput = '';
            //         shownInput = '';
            //         input.value = '.';
            //         currentInput = currentInput.slice(0,-3);
            //         }
                    
            //     }
            //     else{
                    mistakeCheck = 0;
                    reset();
               // }
        }
        else if (btnVal === 'П+'){
            mistakeCheck = 0;
            memoryStorage += parseFloat(shownInput);
            console.log(memoryStorage);
           // reset();
        }
        else if (btnVal === 'ИП'){
            mistakeCheck = 0;
            input.value = memoryStorage+'.';
            currentInput = memoryStorage.toString();
            shownInput = memoryStorage.toString();
        }
        else if (btnVal === 'СП'){
            mistakeCheck = 0;
            memoryStorage = 0;
            //shownInput = '';
            console.log(memoryStorage);
        }
        else if (btnVal === '|-|'){
            mistakeCheck = 0;
            var reverseNumber = -parseFloat(currentInput);
            input.value = reverseNumber+'.';
            currentInput = reverseNumber.toString();
            shownInput = currentInput;
        }
        // Операции
        else if (operators.includes(btnVal)){
            if(btnVal != '%'){
                oper = btnVal;
            }
            timesClicked += 1;
            mistakeCheck = 0;
            isOperatorClicked = true;
            currentInput += ' ' + ' ' + btnVal;
            input.value = shownInput+'.';
            if (input.value.endsWith('.') && pointActive === true) {
                input.value = input.value.slice(0, -1);
            }
            pointActive = false;
            shownInput = '';
        }
        else if(btnVal === '.')
        {
            if (!shownInput.includes('.')) {  // Проверка на наличие точки
                pointActive = true;
                shownInput += btnVal;
                currentInput += btnVal;
                input.value = shownInput;
            }
        }
        //Добавляем введенное значение
        else {
            mistakeCheck = 0;
            if(!isOperatorClicked){
                if(canAddToInput(btnVal)){
                    if(!operators.some(op1 => currentInput.includes(op1))){
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
                  lastInput += btnVal;
                }
                shownInput += btnVal;
                currentInput += btnVal;
                input.value = shownInput+'.';
              }
            }
            if (input.value.endsWith('.') && pointActive === true) {
                input.value = input.value.slice(0, -1);
            }
        }
    });
});
