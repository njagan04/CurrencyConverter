import { useState, useEffect } from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';

const BASE_URL = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_mGVSWKJ7otJiwbFO2owG2yvTEOAi9yncRxqX9h35';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  //console.log(currencyOptions)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(response => {
        if (response && response.data) {
          const firstCurrency = Object.keys(response.data)[0]

          setCurrencyOptions([...Object.keys(response.data)]);
          setFromCurrency(response.base)
          setToCurrency(firstCurrency)

        } else {
          console.error('Error: response.data is undefined or null');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
      />
      <div className='equals'> = </div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}

      />
    </>
  );
}

export default App;
