import { createStore, applyMiddleware } from "redux";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    default:
      return state;
  }
};

export const customMiddleware = (store) => (next) => (action) => {
  console.log("default state:", store.getState());
  next(action);
  console.log("updated state:", store.getState());
  return;
};

const store = createStore(reducer, applyMiddleware(customMiddleware));

store.dispatch({ type: "ADD" });
