const footer = () => {
  const footer = document.createElement("footer");
  footer.id = "footer";

  const footerContent = document.createElement("div");

  const newTodoButton = document.createElement("button");
  newTodoButton.id = "new-todo-button";
  newTodoButton.textContent = "New Todo";

  footerContent.appendChild(newTodoButton);
  footer.appendChild(footerContent);

  return footer;
};

export default footer;
