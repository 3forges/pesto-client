import { createStore, applyMiddleware, compose } from "redux";
//import { createAsyncThunk } from 'redux-thunk'
import thunkMiddleware from "redux-thunk";
import { customMiddleware } from "../snippets/12-tiny-middleware";

// Creating a random button that will increase count on click
const Button = document.createElement("button");
Button.innerText = "Click me";

// Action types
const ADD = "ADD";
const FETCH = "FETCH"

// Normal action
/*
const normalAction = () => ({
  type: ADD
});
*/

// Async action
const asyncAction = () => (dispatch) => {
  // This is to simulate a data fetch from remote database for example
  // You would fetch the data, and then you would send it to Redux
  setTimeout(() => {
    dispatch({ type: FETCH });
  }, 1000);
};
/*
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('/fakeApi/posts')
  return response.data
})
*/
// Reducer chooses what to do with our action type
async function reducer(state = 0, action) {
  switch (action.type) {
    case ADD:
      return state + 1;
    case FETCH: {
      let res = await fetch('http://localhost:3000/pesto-content-type', { mode: 'no-cors'})
      console.log(res)
      return res.json
    }
    default:
      return state;
  }
}

// Store keeps the value
const store = createStore(
  reducer,
  /* originalState, // Optional parameter. This overwrites the default state in the reducer function, if combineReducers is used, this should be an object with reducer names and their default states */
  /* As a third parameter come store enhancers. If you want to use multiple store enhancers, use use compose(). Don't confuse store enhancers with middleware. The function applyMiddleware() is a store enhancer, the only official one that ships with Redux. It takes middleware as a parameter. */
  compose(
    applyMiddleware(
      // 1. Custom middleware
      customMiddleware,

      // 2. Thunk for async
      // Without thunk, actions can be only objects, but with thunk, they can be also functions, which handle async logic
      thunkMiddleware
    ),

    // 3. Devtools extension
    // Easier way: import { composeWithDevTools } from 'redux-devtools-extension'
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f // This is to make the Redux for Chrome extension work in an incognito window with disabled Redux extension
  )
);

// Dispatch the action to store on click
// Store forwards the action to the reducer to decide what to do with it
// Reducer returns new value to the store
Button.addEventListener("click", () => store.dispatch(asyncAction()));
store.subscribe(() => {
  Button.innerText = store.getState();
});

// Exporting the Button
export { Button as ExampleThree };
