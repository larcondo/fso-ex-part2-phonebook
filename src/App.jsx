import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ])
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (persons.some( entry => entry.name === newName ))
      return alert(`${newName} is already added to phonebook`)

    setPersons([...persons, {name: newName}])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      { persons.map( person => {
        return <p key={person.name}>{ person.name }</p>
      })}
    </div>
  )
}

export default App