import { createStore, combineReducers } from "redux";

// Get the elements for easy manipulation
const Page = document.createElement("div");
const Input = Page.appendChild(document.createElement("input"));
const Button = Page.appendChild(document.createElement("button"));
Button.innerText = "Submit";
const TasksAdded = Page.appendChild(document.createElement("div"));
const Container = Page.appendChild(document.createElement("div"));
Container.classList.add("container");

// Action types
const ADD = "ADD";
const REMOVE = "REMOVE";

// Action creators
const addingAction = (value) => {
  return {
    type: ADD,
    payload: { value }
  };
};

const removingAction = (index) => {
  return {
    type: REMOVE,
    payload: { index }
  };
};

// Now here will be two reducers
const toDosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.payload.value];
    case REMOVE:
      return state.filter((item, index) => index !== action.payload.index);
    default:
      return state;
  }
};

const clicksReducer = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    case REMOVE:
      return state - 1;
    default:
      return state;
  }
};

// Now we will combine the reducers
const combinedReducer = combineReducers({
  toDos: toDosReducer,
  clicks: clicksReducer
});

// Store to keep the state
// If it gets default state, it will overwrite the deafult state of reducers
const store = createStore(combinedReducer, { toDos: [], clicks: 0 });

// Function to rerender the container
const render = () => {
  // Clean the container first
  Container.innerHTML = "";

  // Then go through each item in state
  store.getState().toDos.forEach((item, index) => {
    const ToDoItem = document.createElement("p");
    ToDoItem.innerText = item;
    ToDoItem.classList.add("to-do-item");
    ToDoItem.addEventListener("click", () => {
      // By clicking on a To-Do, we remove it from the list
      store.dispatch(removingAction(index));
    });
    Container.appendChild(ToDoItem);
  });
  TasksAdded.innerHTML = `Tasks added: ${store.getState().clicks}`;
};

// By submitting a new To-Do, we want to add it to the list
Button.addEventListener("click", () => {
  if (!!Input.value) {
    store.dispatch(addingAction(Input.value));
  }
});

// We re-render the list of To-Dos on each state change
store.subscribe(() => render());

export { Page as ExampleTwo };
