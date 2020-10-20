import React, { useEffect, useState } from "react";
import axios from "axios";

const weatherstack_api_key = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${weatherstack_api_key}&query=${country.capital}`
      )
      .then((result) => {
        setWeather(result.data);
      });
  }, [country]);

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        style={{ height: "100px" }}
      />
      {weather ? (
        <>
          <h3>Weather in {country.capital}</h3>
          <div>
            <span style={{ fontWeight: "bold" }}>temperature:</span>{" "}
            {weather.current.temperature} celsius
          </div>
          <img
            src={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions[0]}
          />
          <div>
            <span style={{ fontWeight: "bold" }}>wind:</span>{" "}
            {weather.current.wind_speed} Km/H direction{" "}
            {weather.current.wind_dir}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Country;
