import axios from 'axios';
const FIXER_API_KEY='7621e1d10dedd4ca1c5bfde1e1569f2e'
const FIXER_API=`http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;
const REST_COUNTRIES_API=`https://restcountries.eu/rest/v2/currency`

const getExchangeRate= async (fromCurrency,toCurrency) => {
try{
    const {data:{rates}}=await axios.get(FIXER_API);
const euro=1/rates[fromCurrency]
const exchangeRate=euro*rates[toCurrency]
return exchangeRate
} 
catch(error){
    throw new Error('error')
}
}
//getExchangeRate('AUD','EUR')
const getCountries=async (currencyCode) => {
    const {data}=await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`)
    return data.map(({name}) => name)
}

const convertCurrency=async (fromCurrency,toCurrency,amount) => {
fromCurrency=fromCurrency.toUpperCase()
toCurrency=toCurrency.toUpperCase()
const [countries,exchangeRate]=await Promise.all(
    [getCountries(toCurrency),
        getExchangeRate(fromCurrency,toCurrency)
    ]);
const exchangeAmount=(amount*exchangeRate).toFixed(2)
return (
    `${amount} ${fromCurrency} is worth ${exchangeAmount} ${toCurrency}.
    You can spend these in the following countries:${countries}` 
)
}
convertCurrency('inr','usd',30000)
.then((result)=> console.log(result))
.catch((error)=>console.log(error));
