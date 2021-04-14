import React, { useEffect, useState, useRef } from 'react'
import HighLightElement from './HighLightElement'
import './App.sass'
const App = () => {
  const inputRef = useRef(null)
  const [filteredPersonajes, setFilteredPersonajes] = useState([])
  const [textSearch, setTextSearch] = useState('')
  const [textSearchTemp, setTextSearchTemp] = useState('')

  const [loading, setLoading] = useState(true)

  const getData = async () => {
    let result = await fetch(`https://rickandmortyapi.com/api/character/?page=1`, { method: 'GET' })
    result = await result.json()
    return result.results.map((item) => ({ name: item.name, index: 0 }))
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [inputRef.current])

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      let Newpersonajes = await getData()
      Newpersonajes = Newpersonajes.map((personaje) => {
        let index = personaje.name.toLowerCase().search(textSearch.toLowerCase())
        return { name: personaje.name, index }
      }).filter((item) => item.index !== -1)
      setLoading(false)
      setFilteredPersonajes(Newpersonajes)
    }
    fetchData()
  }, [textSearch])

  return (
    <div className="ContainerApp">
      <h2>Search - Functional component</h2>
      <div className="Result">
        <div className="Items">
          <input
            ref={inputRef}
            placeholder="Type a name"
            value={textSearchTemp === '' ? textSearch : textSearchTemp}
            onChange={(e) => setTextSearch(e.target.value)}
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                document.activeElement.nextElementSibling?.nextElementSibling &&
                  document.activeElement.nextElementSibling.nextElementSibling.focus()
                e.preventDefault()
              }
            }}
            onFocus={() => setTextSearchTemp('')}
          />
          {loading && <div className="loader"></div>}
          {!loading && textSearch !== '' && filteredPersonajes.length > 1 ? (
            <HighLightElement word={textSearch} index={0} haveTab={false} />
          ) : null}
          {!loading && textSearch !== ''
            ? filteredPersonajes.map((personaje, index) => (
                <HighLightElement
                  key={index}
                  word={personaje.name}
                  index={personaje.index}
                  size={textSearch.length}
                  sendTempText={(tempText) => setTextSearchTemp(tempText)}
                  sendText={(text) => {
                    setTextSearch(text)
                    inputRef.current.focus()
                  }}
                  haveTab={true}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default App
