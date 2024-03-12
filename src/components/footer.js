const footer = () => {
  const footer = document.createElement("footer");
  footer.id = "footer";

  const footerContent = document.createElement("div");

  const footerItems = document.createElement("ul");
  footerItems.className = "w-full flex justify-around";

  const footerItemOne = document.createElement("li");
  const newTodoButton = document.createElement("button");
  newTodoButton.id = "new-todo-button";
  newTodoButton.textContent = "New Todo";

  footerItemOne.appendChild(newTodoButton);

  const footerItemTwo = document.createElement("li");
  const updateTodoButton = document.createElement("button");
  updateTodoButton.id = "update-todo-button";
  updateTodoButton.textContent = "Update Todo";

  footerItemTwo.appendChild(updateTodoButton);

  const footerItemThree = document.createElement("li");
  const deleteTodoButton = document.createElement("button");
  deleteTodoButton.id = "delete-todo-button";
  deleteTodoButton.textContent = "Delete Todo";

  footerItemThree.appendChild(deleteTodoButton);

  footerItems.appendChild(footerItemOne);
  footerItems.appendChild(footerItemTwo);
  footerItems.appendChild(footerItemThree);
  footerContent.appendChild(footerItems);
  footer.appendChild(footerContent);

  return footer;
};

export default footer;
