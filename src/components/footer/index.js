import funcs from "./funcs.js";

const footer = (projects) => {
  const footer = document.createElement("footer");
  footer.id = "footer";

  const footerContent = document.createElement("div");

  const footerItems = document.createElement("ul");
  footerItems.className = "w-full flex justify-around";

  const footerItemOne = document.createElement("li");
  const newTodoButton = document.createElement("button");
  newTodoButton.id = "new-todo-button";
  newTodoButton.textContent = "New Todo";

  newTodoButton.addEventListener("click", () => {
    console.log("New todo button clicked");
    funcs.openNewTodoModal(projects);
  });

  footerItemOne.appendChild(newTodoButton);

  footerItems.appendChild(footerItemOne);
  footerContent.appendChild(footerItems);
  footer.appendChild(footerContent);

  return footer;
};

const addFooter = (projects) => {
  const contentAndFooter = document.getElementById("content-and-footer");
  const footerElement = footer(projects);
  contentAndFooter.appendChild(footerElement);
};

export default addFooter;
