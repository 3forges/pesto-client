import { createStore } from "redux";

const Button = document.createElement("button");
Button.innerText = "Click me";

// Action Types
const ADD = "ADD";

// Action Creators
const addingAction = () => ({
  type: ADD,
  payload: 1
});

// Reducer chooses what to do with the action
const reducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + action.payload;
    default:
      return state;
  }
};

// Store keeps the value
const store = createStore(reducer);

// Dispatch the action to store on click
Button.addEventListener("click", () => {
  store.dispatch(addingAction());
  // Store forwards the action to the reducer to decide what to do with it
  // Reducer returns new value to the store
});

// When the state changes, we update the UI
store.subscribe(() => {
  Button.innerText = store.getState();
});

export { Button as ExampleOne };
