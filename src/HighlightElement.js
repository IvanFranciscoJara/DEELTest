import React from 'react'
import './HighlightElement.sass'

const HighLightElement = ({ word, index, size, sendTempText, sendText, haveTab }) => {
  const Part1 = word.substring(0, index)
  const Part2 = word.substring(index, index + size) // This is the part that match the search Text
  const Part3 = word.substring(index + size, word.length)

  return (
    <p
      className={`ContainerHighlightElement`}
      tabIndex={haveTab ? '0' : null}
      onFocus={() => {
        sendTempText(word)
      }}
      onClick={() => sendText(word)}
      onKeyDown={(e) => {
        switch (e.key) {
          case 'ArrowDown':
          case 'Tab':
            document.activeElement.nextElementSibling && document.activeElement.nextElementSibling.focus()
            break
          case 'ArrowUp':
            document.activeElement.previousElementSibling.tabIndex !== -1
              ? document.activeElement.previousElementSibling.focus()
              : document.activeElement.previousElementSibling.previousElementSibling.focus()
            break
          case 'Enter':
            sendText(word)
            break
          default:
            break
        }
        e.preventDefault()
      }}
    >
      {Part1}
      <span>{Part2}</span>
      {Part3}
    </p>
  )
}

export default HighLightElement
