let billInput = document.getElementById("billInput");
let customTipPercentage = document.getElementById('custom-tip-percentage');
let customInput = document.getElementById("customInput");
let numberOfPeople = document.getElementById("numberPeopleInput");
let tipValue = document.querySelectorAll(".tip-value");

// get display Total Amount and Total element
let displayTipAmount = document.getElementById("displayTipAmount");
let total = document.getElementById("displayTotal");

// button reset
const resetButton = document.getElementById("resetButton");

// Text warning if number of people empty
const textDanger = document.getElementById('text-danger-empty');
const boxDanger = document.getElementById('box-danger');

// percentage from button
var percentage;

resetButton.addEventListener('click', () => {
    displayTipAmount.innerText = '$0.00';
    total.innerText = '$0.00';
    billInput.value = '';
    numberOfPeople.value = '';
    customInput.value = '';
    percentage = 0;
    tipValue.forEach(el => {
        if(el.classList.contains('bg-Strong-cyan')){
            el.classList.add('bg-Very-dark-cyan');
            el.classList.remove('bg-Strong-cyan');
            el.classList.add('text-white');
        }
    });
    resetButton.classList.add('opacity-20', 'cursor-not-allowed');
    textDanger.classList.remove('hidden');
    boxDanger.classList.add('border-red-400', 'border');
});

tipValue.forEach(buttonPercentage => {
    buttonPercentage.addEventListener("click", () => {
        percentage = buttonPercentage.innerText.slice(0, 2);
        if(billInput.value.length === 0 || numberOfPeople.value.length === 0){
            displayTipAmount.innerText = '$0.00';
            total.innerText = '$0.00';
            resetButton.classList.add('opacity-20', 'cursor-not-allowed');
        }
        else{
            let numberBill = parseFloat(billInput.value);
            let numberPeople = parseFloat(numberOfPeople.value);
            resetButton.classList.remove('opacity-20', 'cursor-not-allowed');
            calcTipAmount(numberBill, numberPeople);
            calcTipTotal(numberBill, numberPeople);
        }
        buttonPercentage.classList.add('bg-Strong-cyan');
        buttonPercentage.classList.remove('bg-Very-dark-cyan');
        buttonPercentage.classList.add('text-Very-dark-cyan');
        tipValue.forEach(el => {
            if(el.classList.contains('bg-Strong-cyan')){
                el.classList.add('bg-Very-dark-cyan');
                el.classList.remove('bg-Strong-cyan');
                el.classList.add('text-white');
                customInput.value = '';
            }
        });
        buttonPercentage.classList.add('bg-Strong-cyan');
        buttonPercentage.classList.remove('text-white');
    });
});

// Function for calculate Tip Amount and display it
calcTipAmount = (numberBill, numberPeople) => {
    percentage = parseFloat(percentage);
    let tipAmount = (numberBill * percentage)/numberPeople;
    displayTipAmount.innerText = `$${(tipAmount/100).toFixed(2)}`;
};

calcTipTotal = (numberBill, numberPeople) => {
    percentage = parseFloat(percentage);
    let totalTip = (numberBill + ((percentage * numberBill)/100));
    total.innerText = `$${(totalTip/numberPeople).toFixed(2)}`;
};

customTipPercentage.addEventListener("click", () => {
    tipValue.forEach(buttonPercentage => {
        if(buttonPercentage.classList.contains('bg-Strong-cyan') && buttonPercentage.classList.contains('text-Very-dark-cyan')){
            buttonPercentage.classList.remove('bg-Strong-cyan');
            buttonPercentage.classList.remove('text-Very-dark-cyan');
        }
    });
});

customInput.addEventListener("keyup", () => {
    let tipCustom = parseFloat(customInput.value);
    percentage = tipCustom;
    if(billInput.value.length === 0 || numberOfPeople.value.length === 0 || isNaN(percentage)){
        displayTipAmount.innerText = '$0.00';
        total.innerText = '$0.00';
        resetButton.classList.add('opacity-20', 'cursor-not-allowed');
    }
    else{
        let numberBill = parseFloat(billInput.value);
        let numberPeople = parseFloat(numberOfPeople.value);
        resetButton.classList.remove('opacity-20', 'cursor-not-allowed');
        calcTipAmount(numberBill, numberPeople);
        calcTipTotal(numberBill, numberPeople);
    }
});

billInput.addEventListener("keyup", () => {
    let numberBill = parseFloat(billInput.value);
    let numberPeople = parseFloat(numberOfPeople.value);
    if(numberOfPeople.value.length === 0 || billInput.value.length === 0 || isNaN(percentage)){
        displayTipAmount.innerText = '$0.00';
        total.innerText = '$0.00';
        resetButton.classList.add('opacity-20', 'cursor-not-allowed');
    }
    else{
        resetButton.classList.remove('opacity-20', 'cursor-not-allowed');
        calcTipAmount(numberBill, numberPeople);
        calcTipTotal(numberBill, numberPeople);
    }
});

numberOfPeople.addEventListener("keyup", () => {
    let numberBill = parseFloat(billInput.value);
    let numberPeople = parseFloat(numberOfPeople.value);
    if(numberOfPeople.value.length !== 0){
        textDanger.classList.add('hidden');
        boxDanger.classList.remove('border-red-400', 'border');
        boxDanger.classList.add('m-[-1px]');
    }
    if(numberOfPeople.value.length === 0){
        textDanger.classList.remove('hidden');
        boxDanger.classList.add('border-red-400', 'border');
        // boxDanger.classList.add('m-[-1px]');
    }
    if(billInput.value.length === 0 || numberOfPeople.value.length === 0 || isNaN(percentage)){
        displayTipAmount.innerText = '$0.00';
        total.innerText = '$0.00';
        resetButton.classList.add('opacity-20', 'cursor-not-allowed');
    }
    else{
        resetButton.classList.remove('opacity-20', 'cursor-not-allowed');
        calcTipAmount(numberBill, numberPeople);
        calcTipTotal(numberBill, numberPeople);
    }
});