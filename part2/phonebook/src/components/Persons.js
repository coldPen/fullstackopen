import React from "react";

const Persons = ({ persons, search, deletePerson }) => (
  <>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
  </>
);

export default Persons;
