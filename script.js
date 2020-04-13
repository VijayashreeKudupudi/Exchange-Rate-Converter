//Explanation of how json works and how to fetch
// function calculate() {
//     // fetch('items.json').then(res => {
//     //     console.log(res);
//     // });  //to see response of item

//     //In above fetch data wont be availabel, so u have to take this response and then format it to what u want, in this case as json
//     fetch('items.json')
//         .then(res => res.json())
//             .then(data => console.log(data));
// }

// calculate();

const currencyElements_one = document.getElementById('currency-one');
const currencyElements_two = document.getElementById('currency-two');
const amountElements_one = document.getElementById('amount-one');
const amountElements_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rates and update the DOM
function calculate() {
    const currency_one =  currencyElements_one.value;
    const currency_two =  currencyElements_two.value;

    fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
        .then(res => res.json())
            .then(data => {
                // console.log(data);
                const rate = data.rates[currency_two];

                // console.log(rate);
                rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

                amountElements_two.value = (amountElements_one.value * rate).toFixed(2);
                //toFixed method is because we want two decimal points
            });

}

//Event Listeners
currencyElements_one.addEventListener('change', calculate);
amountElements_one.addEventListener('input', calculate);
currencyElements_two.addEventListener('change', calculate);
amountElements_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElements_one.value;
    currencyElements_one.value = currencyElements_two.value;
    currencyElements_two.value = temp;
    calculate();
});

calculate();