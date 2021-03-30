import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data))
  }, []);
  
  useEffect(() => {
    const queryRegexp = new RegExp(query, 'i');
    setFilteredCountries(countries.filter(c => queryRegexp.test(c.name)));
    setShow(Array(filteredCountries.length).fill(false));
  }, [query]);

  console.log('rerendered', query);

  const toggleShowOf = (i) => {
    const newShow = [...show];
    newShow[i] = !newShow[i];
    setShow(newShow);
  }
  
  return (
    <div>
      find countries <input value={query} onChange={event => setQuery(event.target.value)}></input>
      <div>
        {query !== '' && filteredCountries.length >= 10
          ? <p>Too many matches, specify another filter</p>
          : filteredCountries.length === 1
            ? <Country country={filteredCountries[0]} />
            : filteredCountries.map((c, i) => (
              <React.Fragment key={c.name}>
                <p>{c.name} <button onClick={() => toggleShowOf(i)}>{show[i] ? 'hide' : 'show'}</button></p>
                {show[i] && <Country country={c} />}
              </React.Fragment>
            ))}
      </div>
    </div>
  );
}

export default App;
