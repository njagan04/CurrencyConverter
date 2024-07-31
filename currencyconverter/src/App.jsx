import { useState, useEffect } from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';

//const BASE_URL = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_mGVSWKJ7otJiwbFO2owG2yvTEOAi9yncRxqX9h35';
const BASE_URL = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_3wLly8NLeuE8scSORSmCb8ROZxx6YKmcx0CB2otJ';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  //console.log(currencyOptions)
  //console.log(exchangeRate)
  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(response => {
        if (response && response.data) {
          const firstCurrency = Object.keys(response.data)[1]

          setCurrencyOptions([...Object.keys(response.data)]);
          setFromCurrency(response.base)
          setToCurrency(firstCurrency)
          setExchangeRate(response.data[firstCurrency])

        } else {
          console.error('Error: response.data is undefined or null');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromAmount}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(response => setExchangeRate(response.data[toCurrency]))
      .catch(error => console.error('Error fetching exchange rate:', error));
    }
  },[fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  
  
  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={ handleFromAmountChange}
        amount={ fromAmount}
      />
      <div className='equals'> = </div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}

        amount={ toAmount}
      />
    </>
  );
}

export default App;
