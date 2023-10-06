import { ExampleOne } from "./src/1";
import { ExampleTwo } from "./src/2";
import { ExampleThree } from "./src/3";
import { ExampleFour } from "./src/4";

const pages = {
  "Example 1: Tiny App": ExampleOne,
  "Example 2: To-Do-List App": ExampleTwo,
  "Example 3: Middleware App": ExampleThree,
  "Example 4: Coffeeshop": ExampleFour
};

const App = document.getElementById("app");
App.classList.add("app");

const Navigation = App.appendChild(document.createElement("div"));
Navigation.classList.add("navigation");

const PageContent = App.appendChild(document.createElement("div"));
PageContent.classList.add("page-content");

for (const lessonName in pages) {
  const Button = document.createElement("button");
  Button.innerText = lessonName;
  Button.addEventListener("click", () => render(lessonName));
  Navigation.appendChild(Button);
}

const render = (lessonName) => {
  PageContent.innerText = "";
  try {
    PageContent.appendChild(pages[lessonName]);
  } catch {
    console.error(`Couldn't load "${lessonName}"`);
  }
};
