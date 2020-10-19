import React from "react";

const Persons = ({ persons, search }) => (
  <>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
  </>
);

export default Persons;
