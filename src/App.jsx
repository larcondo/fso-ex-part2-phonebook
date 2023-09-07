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
  const [notification, setNotification] = useState({ message: null, errorStyle: false })

  useEffect(() => {
    refreshPersons()
  }, [])

  const refreshPersons = () => {
    personService
      .getAll()
      .then( initialPersons => setPersons(initialPersons))
  }

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addEntry = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 10000)
    }

    personService
      .add(newPerson)
      .then( returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNotification({ errorStyle: false, message: `Added ${returnedPerson.name}` })
        setTimeout(() => setNotification({ errorStyle: false, message: null }), 2000)
        clearInputs()
      })
  }

  const updateEntry = (personObj) => {
    personService
      .update(personObj.id, { ...personObj, number: newNumber })
      .then( updatedPerson => {
        setPersons(persons.filter( p => p.id !== personObj.id).concat(updatedPerson))
        setNotification({ errorStyle: false, message: `Updated ${updatedPerson.name}` })
        setTimeout(() => {
          setNotification({ errorStyle: false, message: null })
        }, 2000)
        clearInputs()
      })
      .catch( error => {
        setNotification({ 
          errorStyle: true, 
          message: `Information of ${personObj.name} has already been removed from server` 
        })
        setTimeout(() => {
          setNotification({ errorStyle: false, message: null })
        }, 3000)
        setPersons(persons.filter( p => p.id !== personObj.id ))
      })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const personToUpdate = persons.find( p => p.name === newName )
    if (personToUpdate) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return
      updateEntry(personToUpdate)
    } else {
      addEntry()
    }
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />

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