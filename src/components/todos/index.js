import todoItem from "./todoItem.js";

const todos = (projects, title, todos) => {
  const todosList = document.createElement("ul");
  const todosListHeader = document.createElement("h2");
  todosListHeader.id = "project-title";
  todosListHeader.className = "header1 m-8";
  todosListHeader.textContent = title;

  todosList.appendChild(todosListHeader);
  todos.forEach((todo) => {
    const todoItemElement = todoItem(projects, title, todo);
    todosList.appendChild(todoItemElement);
  });

  return todosList;
};

export default todos;
