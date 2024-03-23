import funcs from "./funcs.js";
import plusIcon from "../icons/plus.js";

const newTodoButton = (projects) => {
  const newTodoButton = document.createElement("button");
  newTodoButton.id = "new-todo-button";
  newTodoButton.className = "button";

  const newTodoButtonIcon = plusIcon();
  newTodoButton.appendChild(newTodoButtonIcon);

  const newTodoButtonText = document.createElement("span");
  newTodoButtonText.textContent = "New Todo";

  newTodoButton.appendChild(newTodoButtonText);

  newTodoButton.addEventListener("click", () => {
    console.log("New todo button clicked");
    funcs.openNewTodoModal(projects);
  });

  return newTodoButton;
};

const footer = (projects) => {
  const footer = document.createElement("footer");
  footer.id = "footer";

  const footerContent = document.createElement("div");
  footerContent.className = "new-todo-button-container";

  const newTodoButtonElement = newTodoButton(projects);

  footerContent.appendChild(newTodoButtonElement);
  footer.appendChild(footerContent);

  return footer;
};

const addFooter = (projects) => {
  const contentAndFooter = document.getElementById("content-and-footer");
  const footerElement = footer(projects);
  contentAndFooter.appendChild(footerElement);
};

export default addFooter;
