const Persons = ({ persons, filter }) => {
  return(
    <>
      { persons
          .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
          .map( p => {
            return <Person person={p} key={p.id} />
          })
      }
    </>
  )
}

const Person = ({ person }) => {
  return(
    <p>{person.name} {person.number}</p>
  )
}

export default Persons