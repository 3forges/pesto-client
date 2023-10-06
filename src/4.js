// A Redux coffee shop metaphor

import { createStore, combineReducers } from "redux";

// Get the elements for easy manipulation
const Page = document.createElement("div");
const Accounting = Page.appendChild(document.createElement("div"));
Accounting.classList.add("accounting");
const Tables = Page.appendChild(document.createElement("div"));

// Default state
const defaultOrder = {
  espresso: 0,
  cappuccino: 0,
  latte: 0
};

const defaultTables = [
  {
    tableId: 1,
    orderList: { ...defaultOrder }
  },
  {
    tableId: 2,
    orderList: { ...defaultOrder }
  },
  {
    tableId: 3,
    orderList: { ...defaultOrder }
  }
];

const defaultAccounting = 0;

// Actions: what's possible to do
const ORDER = "ORDER";
const PAY = "PAY";

// Action creators: the customers
const orderAction = (tableId, coffeeType) => {
  return {
    type: ORDER,
    payload: {
      tableId,
      coffeeType
    }
  };
};

const payAction = (tableId, coffeeCount) => {
  return {
    type: PAY,
    payload: {
      tableId,
      coffeeCount
    }
  };
};

// Reducers: managers deciding what to do with the input
const tablesReducer = (tables = [...defaultTables], action) => {
  switch (action.type) {
    case ORDER:
      return tables.map((table) => {
        if (table.tableId === action.payload.tableId) {
          return {
            ...table,
            orderList: {
              ...table.orderList,
              [action.payload.coffeeType]:
                table.orderList[action.payload.coffeeType] + 1
            }
          };
        }
        return table;
      });
    case PAY:
      return tables.map((table) => {
        if (table.tableId === action.payload.tableId) {
          return {
            ...table,
            orderList: { ...defaultOrder }
          };
        }
        return table;
      });
    default:
      return tables;
  }
};

const accountingReducer = (accounting = defaultAccounting, action) => {
  if (action.type === PAY) {
    return accounting + action.payload.coffeeCount;
  }
  return accounting;
};

// Now we combine all reducers into one cohesive unit
const combinedReducers = combineReducers({
  tables: tablesReducer,
  accounting: accountingReducer
});

// Now we create the store
const store = createStore(combinedReducers);

// Function to rerender the content
const render = () => {
  // Clean the containers first
  Tables.innerHTML = "";
  Accounting.innerHTML = "";

  // Render Tables
  store.getState().tables.forEach((table, index) => {
    // Create Table
    const Table = document.createElement("div");
    Table.classList.add("tables");

    // Add Table ID information
    const TableId = document.createElement("div");
    TableId.innerText = `Table number ${table.tableId}`;
    Table.appendChild(TableId);

    for (const coffeeType in table.orderList) {
      // Add information about current order for each coffeeType
      const CoffeeButton = document.createElement("button");
      CoffeeButton.innerText = `${coffeeType}: ${table.orderList[coffeeType]}`;

      CoffeeButton.addEventListener("click", () => {
        store.dispatch(orderAction(table.tableId, coffeeType));
      });

      Table.appendChild(CoffeeButton);
    }

    // Add option to pay
    const PayButton = document.createElement("button");
    PayButton.innerText = "Pay";

    // Get the total amount of ordered coffees
    const totalOrderedCoffees = Object.values(table.orderList).reduce(
      (previous, current) => previous + current,
      0
    );

    // Activate option to pay
    if (totalOrderedCoffees > 0) {
      PayButton.removeAttribute("disabled");
      PayButton.addEventListener("click", () => {
        store.dispatch(payAction(table.tableId, totalOrderedCoffees));
      });
    } else {
      PayButton.setAttribute("disabled", true);
    }
    Table.appendChild(PayButton);

    Tables.appendChild(Table);
  });

  // Render Accounting
  const soldCoffees = store.getState().accounting;
  const SoldCoffeesDiv = document.createElement("div");
  SoldCoffeesDiv.innerHTML = `This coffee shop has sold ${soldCoffees} coffees so far.`;
  Accounting.appendChild(SoldCoffeesDiv);
};

render();

// We re-render on each state change
store.subscribe(render);

export { Page as ExampleFour };
