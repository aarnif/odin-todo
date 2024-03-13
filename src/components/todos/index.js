import funcs from "./funcs.js";

const item = (key, value) => {
  const todoItem = document.createElement("li");
  todoItem.textContent = `${key}: ${value}`;
  return todoItem;
};

const checkListItem = (checkList) => {
  const { id, ...items } = checkList;
  const checkListItemList = document.createElement("ul");
  checkListItemList.id = id;
  for (const [key, value] of Object.entries(items)) {
    const checkListItem = document.createElement("li");
    checkListItem.textContent = `${key}: ${value}`;
    checkListItemList.appendChild(checkListItem);
  }
  return checkListItemList;
};

const checkList = (checkList) => {
  const todoCheckList = document.createElement("ul");
  checkList.forEach((item) => {
    const todoCheckListItemContainer = document.createElement("li");
    const todoCheckListItem = checkListItem(item);
    todoCheckListItemContainer.appendChild(todoCheckListItem);
    todoCheckList.appendChild(todoCheckListItemContainer);
  });
  return todoCheckList;
};

const todoItem = (projects, todo) => {
  const { id, title, ...items } = todo;
  const todoContainer = document.createElement("li");
  todoContainer.id = "todo-item";
  todoContainer.dataset.id = id;

  const todoHeader = document.createElement("h3");
  todoHeader.id = "todo-title";
  todoHeader.textContent = title;

  todoContainer.appendChild(todoHeader);

  const updateTodoButton = document.createElement("button");
  updateTodoButton.id = id;
  updateTodoButton.className = "update-todo-button pl-1";
  updateTodoButton.textContent = "U";

  updateTodoButton.addEventListener("click", () => {
    console.log("Update todo button clicked");
    funcs.openUpdateTodoModal(projects, id);
  });

  todoContainer.appendChild(updateTodoButton);

  const deleteTodoButton = document.createElement("button");
  deleteTodoButton.id = id;
  deleteTodoButton.className = "update-todo-button pl-1";
  deleteTodoButton.textContent = "D";

  deleteTodoButton.addEventListener("click", () => {
    console.log("Delete todo button clicked");
    funcs.openDeleteTodoModal(projects, id);
  });

  todoContainer.appendChild(deleteTodoButton);

  const todoItemsList = document.createElement("ul");

  for (const [key, value] of Object.entries(items)) {
    if (key !== "checkList") {
      const todoItemListElement = item(key, value);
      todoItemsList.appendChild(todoItemListElement);
    } else {
      const todoCheckListElement = checkList(value);
      todoItemsList.appendChild(todoCheckListElement);
    }
  }

  todoContainer.appendChild(todoItemsList);

  return todoContainer;
};

const todos = (projects, title, todos) => {
  const todosList = document.createElement("ul");
  const todosListHeader = document.createElement("h2");
  todosListHeader.id = "project-title";
  todosListHeader.textContent = title;

  todosList.appendChild(todosListHeader);
  todos.forEach((todo) => {
    const todoItemElement = todoItem(projects, todo);
    todosList.appendChild(todoItemElement);
  });

  return todosList;
};

export default todos;
