import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person)
        .then((removed) => {
          const newPersons = persons.filter(
            (person) => person.id !== removed.id
          );
          setPersons(newPersons);
        })
        .catch(() => {
          setMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setStatus("error");
          setTimeout(() => {
            setMessage(null);
            setStatus(null);
          }, 5000);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const duplicate = persons.find(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    );

    if (duplicate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update({
            id: duplicate.id,
            name: duplicate.name,
            number: newNumber,
          })
          .then((updated) => {
            setPersons(
              persons.map((person) =>
                person.id === updated.id ? updated : person
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage(`Updated ${updated.name}`);
            setTimeout(() => setMessage(null), 5000);
          })
          .catch(() => {
            setMessage(
              `Information of ${duplicate.name} has already been removed from server`
            );
            setStatus("error");
            setTimeout(() => {
              setMessage(null);
              setStatus(null);
            }, 5000);
          });
      }
    } else {
      personService
        .create({ name: newName.trim(), number: newNumber.trim() })
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");

          setMessage(`Added ${newPerson.name}`);
          setStatus("success");
          setTimeout(() => {
            setMessage(null);
            setStatus(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />
      <Filter search={search} setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
