import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import PhonebookDisplay from './components/PhonebookDisplay'
import ControlledInput from './components/ControlledInput'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === '' || newNumber === '') return
    const match = persons.find(person => person.name === newName)
    if (match !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.updatePerson(match.id, { name: newName, number: newNumber })
          .then((returnedPerson) => {
            setPersons(persons.map(p => p.id !== match.id ? p : returnedPerson))
            setMessage(`Updated info for ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })
          .catch(() => {
            setMessage(`Error: Info for ${newName} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
            setPersons(persons.filter(p => p.name !== newName))
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }
    personService.addPerson({ name: newName, number: newNumber }).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(`Added info for ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    })
  }

  const handleDeleteFor = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Deleted info for ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ControlledInput text={'filter shown with '} value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <form>
        <ControlledInput text={'name: '} value={newName} onChange={handleNameChange} />
        <ControlledInput text={'number: '} value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <PhonebookDisplay persons={persons} filter={filter} handleDeleteFor={handleDeleteFor} />
    </div>
  )
}

export default App
