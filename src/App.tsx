import { useState } from 'react'
import thunk from 'redux-thunk'
import { applyMiddleware, configureStore } from 'redux'
import { createSlice } from "@reduxjs/toolkit";

//import './App.css'
//import { configureStore } from "@reduxjs/toolkit"

function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0
  }

  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

let store = Redux.configureStore(counter)
let valueEl = document.getElementById('value')

function render() {
  valueEl.innerHTML = store.getState().toString()
}

render()
store.subscribe(render)

document.getElementById('b1')
  .addEventListener('click', function () {
    store.dispatch({ type: 'INCREMENT' })
  })
/*
document.getElementById('decrement')
  .addEventListener('click', function () {
    store.dispatch({ type: 'DECREMENT' })
  })

document.getElementById('incrementIfOdd')
  .addEventListener('click', function () {
    if (store.getState() % 2 !== 0) {
      store.dispatch({ type: 'INCREMENT' })
    }
  })

document.getElementById('incrementAsync')
  .addEventListener('click', function () {
    setTimeout(function () {
      store.dispatch({ type: 'INCREMENT' })
    }, 1000)
  })
*/
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div> speaking to REAST-API thrue redux-thunk</div>
      <div>
        <input id="b1" type="button" value="test" onclick="" />
      </div>
    </>
  )
}

export default App
