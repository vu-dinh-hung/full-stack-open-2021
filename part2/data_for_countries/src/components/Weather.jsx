import React from 'react';

const Weather = ({ weather }) => {
  if (!weather) {
    return 'Loading weather...'
  } else if (!weather.current) {
    return 'Weather data not found.'
  }
  return (
    <>
      <p><b>temperature: </b>{weather.current.temperature} Celsius</p>
      <img alt='weather icon' src={weather.current.weather_icons} />
      <p><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </>
  )
}

export default Weather;
