import personService from "../services/persons"

const Persons = ({ persons, filter, refresh }) => {
  return(
    <>
      { persons
          .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
          .map( p => {
            return <Person person={p} key={p.id} refresh={refresh} />
          })
      }
    </>
  )
}

const Person = ({ person, refresh }) => {

  const handleDelete = () => {
    if (window.confirm(`Are you sure to delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(resp => {
          if (resp.status === 200) {
            refresh()
          }
        })
    }
  }

  return(
    <p>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </p>
  )
}

export default Persons