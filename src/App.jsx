import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    refreshPersons()
  }, [])

  const refreshPersons = () => {
    personService
      .getAll()
      .then( initialPersons => setPersons(initialPersons))
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const personToUpdate = persons.find( p => p.name === newName )
    if (personToUpdate) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return
      personService
        .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
        .then( updatedPerson => {
          setPersons(persons.filter( p => p.id !== personToUpdate.id).concat(updatedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Updated ${updatedPerson.name}`)
          setTimeout(() => setMessage(null), 2000)
        })

    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: Math.floor(Math.random() * 10000)
      }
  
      personService
        .add(newPerson)
        .then( returnedPerson => {
          setPersons([...persons, returnedPerson])
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => setMessage(null), 2000)
        })
    }
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter filter={filter} handleFilter={handleFilter} />
      
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
        onSubmit={onSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} refresh={refreshPersons} />
    </div>
  )
}

export default App