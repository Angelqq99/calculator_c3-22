const buttons = document.querySelectorAll('.buttons');
const input = document.querySelector('#display');
const operators = ['+', '-', '*', '/', '%', '|-|'];
var decimalAdded = false;
var memoryStorage = 0;
var isOperatorClicked = false;
<<<<<<< HEAD
var currentInput = ''; 
=======
var currentInput = ''; // хранение введенных данных
>>>>>>> 4fad0cb3ae8b698ec7583ca178d3de077d347ed7
var firstInput = '';
var lastInput = '';
var tempInput = '';
var shownInput = '';

function calculate(){
    try{
        if(lastInput === ''){
            currentInput += tempInput;
        }
        currentInput = currentInput.replace(/,/g, '.');
        var result = eval(currentInput);
<<<<<<< HEAD
=======
        // Проверка на превышение предела 10^16 - 1
>>>>>>> 4fad0cb3ae8b698ec7583ca178d3de077d347ed7
        if(result > (10**16 - 1)) {
            tempInput = '';
            reset();
            input.value = '............';
<<<<<<< HEAD
            return;  
=======
            return;  // Выходим из функции
>>>>>>> 4fad0cb3ae8b698ec7583ca178d3de077d347ed7
        }

        // // Проверка на диапазон больше 10^12 - 1, но меньше 10^16 - 1
        // if (result > (10**12 - 1) && result <= (10**16 - 1)) {
        //     var adjustedResult = result / 10000;
<<<<<<< HEAD
        //     // Преобразуем результат в строку и добавляем 4 нуля в конец 
=======
        //     // Преобразуем результат в строку и добавляем 4 нуля в конец (симулируем смещение запятой вправо)
>>>>>>> 4fad0cb3ae8b698ec7583ca178d3de077d347ed7
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
            calculate();
        }
        // Очистка дисплея, добавить исправление ошибки ввода
        else if (btnVal === 'Cx'){
            reset();
        }
        else if (btnVal === 'П+'){
            memoryStorage += parseFloat(currentInput);
            console.log(memoryStorage);
<<<<<<< HEAD
            reset();
=======
            //currentInput = '';
            //shownInput = '';
            input.value = '';
>>>>>>> 4fad0cb3ae8b698ec7583ca178d3de077d347ed7

        }
        else if (btnVal === 'ИП'){
            input.value = memoryStorage;
            currentInput = memoryStorage.toString();
            shownInput = memoryStorage.toString();
        }
        else if (btnVal === 'СП'){
            memoryStorage = 0;
            console.log(memoryStorage);
        }
        else if (btnVal === '|-|'){
            var reverseNumber = -parseFloat(currentInput);
            input.value = reverseNumber;
            currentInput = reverseNumber.toString();
            shownInput = currentInput;
        }
        // Операции
        else if (operators.includes(btnVal)){
            isOperatorClicked = true;
            currentInput += ' ' + ' ' + btnVal;
            input.value = shownInput;
            shownInput = '';
        }
        //Добавляем введенное значение
        else {
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
                if(operators.some(op => currentInput.includes(op))){
                    lastInput += btnVal;
                }
                    shownInput = lastInput;
                    currentInput += btnVal;
                    input.value = shownInput;
            }
        }
    });
<<<<<<< HEAD
});
=======
});

>>>>>>> 4fad0cb3ae8b698ec7583ca178d3de077d347ed7
