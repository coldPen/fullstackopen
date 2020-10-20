import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";

const CountryElement = ({ name, setSearch }) => (
  <div>
    {name} <button onClick={() => setSearch(name)}>show</button>
  </div>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = search.length
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const searchResult = filteredCountries.length ? (
    filteredCountries.length > 10 ? (
      <div>Too many matches, specify another filter</div>
    ) : filteredCountries.length > 1 ? (
      filteredCountries.map((country) => (
        <CountryElement
          key={country.name}
          name={country.name}
          setSearch={setSearch}
        />
      ))
    ) : (
      <Country country={filteredCountries[0]} />
    )
  ) : null;

  return (
    <>
      <div>
        find countries{" "}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {searchResult}
    </>
  );
};

export default App;
