import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from './Weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY_WEATHER + '&query=' + country.capital)
      .then((response) => {
        setWeather(response.data)
      });
  }, []);

  return (
    <>
      <h2>{country.name}</h2>
      <p><b>capital: </b>{country.capital || 'None'}</p>
      <p><b>population: </b>{country.population.toLocaleString()}</p>
      <h4>languages</h4>
      <ul>
        {country.languages.map((lang) => <li key={lang.name}>{lang.name} - {lang.nativeName}</li>)}
      </ul>
      <img src={country.flag} alt='country flag' />
      {country.capital && <><h3>weather in {country.capital}</h3><Weather weather={weather} /></>}
    </>
  )
}

export default Country;
