import React from 'react'
import ReactDOM from 'react-dom'
import Draggable from './Draggable'

const localStorageMock = (function () {
  let store = {}
  return {
    getItem (key) {
      return store[key]
    },
    setItem (key, value) {
      store[key] = value.toString()
    },
    clear () {
      store = {}
    },
    removeItem (key) {
      delete store[key]
    }
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Draggable />, div)
  ReactDOM.unmountComponentAtNode(div)
})
