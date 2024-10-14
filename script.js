const buttons = document.querySelectorAll('.buttons');
const input = document.querySelector('#display');
const operators = ['+', '-', '*', '/','%', '|-|'];
var decimalAdded = false;
var memoryStorage = '0';
var isOperatorClicked = false;
var currentInput = ''; 
var firstInput = '';
var lastInput = '';
var tempInput = '';
var shownInput = '';
var mistakeCheck = 0;
var oper = '';
<<<<<<< HEAD
var timesClicked = 0;
=======

>>>>>>> 6c73f4f7a614f41a81c0914d12e1267203fa1707
function calculate(){
    try{
        if(lastInput === '' && isOperatorClicked === true){
            currentInput += tempInput;
        }
<<<<<<< HEAD
        if(lastInput !='' && oper !='' && timesClicked >1)
        {
            currentInput+= lastInput;
        }
=======
        if(lastInput !='' && oper !='')
        {
            currentInput+= lastInput;
        }
        else

>>>>>>> 6c73f4f7a614f41a81c0914d12e1267203fa1707
         // Обработка процента
         if (currentInput.includes('%')) {
            var t = parseFloat(firstInput) /100 *parseFloat(lastInput);
            currentInput = firstInput + ' '+oper+' '+t;
            console.log(currentInput);
        }
        currentInput = currentInput.replace(/,/g, '.');
        var result = eval(currentInput);
        if(result > (10**16 - 1)) {
            tempInput = '';
            reset();
            input.value = '............';
            return;  
        }

        // // Проверка на диапазон больше 10^12 - 1, но меньше 10^16 - 1
        // if (result > (10**12 - 1) && result <= (10**16 - 1)) {
        //     var adjustedResult = result / 10000;
        //     // Преобразуем результат в строку и добавляем 4 нуля в конец 
        //     var resultStr = adjustedResult;
        //     // Отображаем результат на экране без десятичной точки
        //     input.value = resultStr;
        //     currentInput = resultStr;  
        //     return;
        // }

        input.value = result;
        currentInput = result.toString();
        shownInput = result.toString();
        if(lastInput != ''){
            tempInput = lastInput;
        }
        firstInput = '';
        lastInput = '';
<<<<<<< HEAD
        timesClicked = 0;
=======
>>>>>>> 6c73f4f7a614f41a81c0914d12e1267203fa1707
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
    currentInput = '';  
    shownInput = '';  
    lastInput = '';  
    firstInput = '';  
    tempInput = '';  
    input.value = '';  
    isOperatorClicked = false;  

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
            if (mistakeCheck === 0) {
                mistakeCheck = 1;
                if(lastInput === ''){
                    currentInput = currentInput.slice(0,-2);
                }
                else{
                lastInput = '';
                currentInput = currentInput.slice(0,-3);
                }
                
            }
            else{
                mistakeCheck = 0;
                reset();
            }
        }
        else if (btnVal === 'П+'){
<<<<<<< HEAD
            memoryStorage = '';
=======
>>>>>>> 6c73f4f7a614f41a81c0914d12e1267203fa1707
            mistakeCheck = 0;
            memoryStorage += parseFloat(shownInput);
            console.log(memoryStorage);
            reset();
<<<<<<< HEAD
            //currentInput = '';
            //shownInput = '';
            //input.value = '';
=======
<<<<<<< HEAD
            //currentInput = '';
            //shownInput = '';
            //input.value = '';
=======
>>>>>>> 40351e39721df0be63731649bad6e129c317ff55
>>>>>>> 6c73f4f7a614f41a81c0914d12e1267203fa1707

        }
        else if (btnVal === 'ИП'){
            mistakeCheck = 0;
            input.value = memoryStorage;
            currentInput = memoryStorage.toString();
            shownInput = memoryStorage.toString();
        }
        else if (btnVal === 'СП'){
            mistakeCheck = 0;
            memoryStorage = 0;
            console.log(memoryStorage);
        }
        else if (btnVal === '|-|'){
            mistakeCheck = 0;
            var reverseNumber = -parseFloat(currentInput);
            input.value = reverseNumber;
            currentInput = reverseNumber.toString();
            shownInput = currentInput;
        }
        // Операции
        else if (operators.includes(btnVal)){
            if(btnVal != '%'){
                oper = btnVal;
            }
<<<<<<< HEAD
            timesClicked += 1;
=======
>>>>>>> 6c73f4f7a614f41a81c0914d12e1267203fa1707
            mistakeCheck = 0;
            isOperatorClicked = true;
            currentInput += ' ' + ' ' + btnVal;
            input.value = shownInput;
            shownInput = '';
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
                    input.value = shownInput;
                }
            }
            else{
<<<<<<< HEAD
                //oper = '';
=======
                oper = '';
>>>>>>> 6c73f4f7a614f41a81c0914d12e1267203fa1707
              if (canAddToInput(btnVal)) {
                if (operators.some((op) => currentInput.includes(op))) {
                  lastInput += btnVal;
                }
                shownInput = lastInput;
                currentInput += btnVal;
                input.value = shownInput;
              }
            }
        }
    });
});
