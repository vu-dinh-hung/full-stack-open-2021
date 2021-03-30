import React from 'react';

const PhonebookDisplay = ({ persons, filter, handleDeleteFor }) => {
  const regexp = new RegExp(filter, 'i');
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter(person => regexp.test(person.name))
        .map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDeleteFor(person.id)}>delete</button></p>)
      }
    </>
  )
}

export default PhonebookDisplay;
