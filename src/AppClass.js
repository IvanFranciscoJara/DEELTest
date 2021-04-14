import React from 'react'
import HighLightElement from './HighLightElement'
import './App.sass'

class AppClass extends React.Component {
  constructor() {
    super()
    this.state = {
      inputRef: null,
      filteredPersonajes: [],
      textSearch: '',
      textSearchTemp: '',
      loading: true,
    }
  }

  async getData() {
    let result = await fetch(`https://rickandmortyapi.com/api/character/?page=1`, { method: 'GET' })
    result = await result.json()
    return result.results.map((item) => ({ name: item.name, index: 0 }))
  }

  async fetchData(value) {
    this.setState({ ...this.state, loading: true, textSearch: value })
    let Newpersonajes = await this.getData()
    Newpersonajes = Newpersonajes.map((personaje) => {
      let index = personaje.name.toLowerCase().search(value.toLowerCase())
      return { name: personaje.name, index }
    }).filter((item) => item.index !== -1)
    this.setState({ ...this.state, filteredPersonajes: Newpersonajes, loading: false }, () =>
      this.state.inputRef.focus()
    )
  }

  async componentDidMount() {
    await this.fetchData(this.state.textSearch)
  }

  async handleChange(value) {
    await this.fetchData(value)
  }
  render() {
    return (
      <div className="ContainerApp">
        <h2>Search - Functional component</h2>
        <div className="Result">
          <div className="Items">
            <input
              ref={(elem) => (this.state.inputRef = elem)}
              placeholder="Type a name"
              value={this.state.textSearchTemp === '' ? this.state.textSearch : this.state.textSearchTemp}
              onChange={(e) => this.handleChange(e.target.value)}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  document.activeElement.nextElementSibling?.nextElementSibling &&
                    document.activeElement.nextElementSibling.nextElementSibling.focus()
                  e.preventDefault()
                }
              }}
              onFocus={() => this.setState({ ...this.state, textSearchTemp: '' })}
            />
            {this.state.loading && <div className="loader"></div>}
            {!this.state.loading && this.state.textSearch !== '' && this.state.filteredPersonajes.length > 1 ? (
              <HighLightElement word={this.state.textSearch} index={0} haveTab={false} />
            ) : null}
            {!this.state.loading && this.state.textSearch !== ''
              ? this.state.filteredPersonajes.map((personaje, index) => (
                  <HighLightElement
                    key={index}
                    word={personaje.name}
                    index={personaje.index}
                    size={this.state.textSearch.length}
                    sendTempText={(tempText) => this.setState({ ...this.state, textSearchTemp: tempText })}
                    sendText={(text) =>
                      this.setState({ ...this.state, textSearch: text }, () => this.state.inputRef.focus())
                    }
                    haveTab={true}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    )
  }
}

export default AppClass
