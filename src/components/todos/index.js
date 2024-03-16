import funcs from "./funcs.js";

const item = (key, value) => {
  const todoItem = document.createElement("li");
  todoItem.textContent = `${key}: ${value}`;
  return todoItem;
};

const checkListItem = (projects, todoId, checkList) => {
  const { id, ...items } = checkList;
  const checkListItemList = document.createElement("ul");
  checkListItemList.id = id;
  for (const [key, value] of Object.entries(items)) {
    const checkListItem = document.createElement("li");
    checkListItem.textContent = `${key}: ${value}`;
    checkListItemList.appendChild(checkListItem);
  }

  const checkListButtonsContainer = document.createElement("li");

  const updateCheckListItemButton = document.createElement("button");
  updateCheckListItemButton.id = id;
  updateCheckListItemButton.className = "update-check-list-item-button pl-1";
  updateCheckListItemButton.textContent = "U";

  updateCheckListItemButton.addEventListener("click", () => {
    console.log("Update check list item button clicked");
    funcs.openUpdateCheckListItemModal(projects, todoId, checkList, id);
  });

  checkListButtonsContainer.appendChild(updateCheckListItemButton);

  const deleteCheckListItemButton = document.createElement("button");
  deleteCheckListItemButton.id = id;
  deleteCheckListItemButton.className = "delete-check-list-item-button pl-1";
  deleteCheckListItemButton.textContent = "D";

  deleteCheckListItemButton.addEventListener("click", () => {
    console.log("Delete check list item button clicked");
    funcs.openDeleteCheckListItemModal(projects, todoId, checkList, id);
  });

  checkListButtonsContainer.appendChild(deleteCheckListItemButton);

  checkListItemList.appendChild(checkListButtonsContainer);

  return checkListItemList;
};

const checkList = (projects, todoId, checkList) => {
  const todoCheckList = document.createElement("ul");
  todoCheckList.id = todoId;
  checkList.forEach((item) => {
    const todoCheckListItemContainer = document.createElement("li");
    const todoCheckListItem = checkListItem(projects, todoId, item);
    todoCheckListItemContainer.appendChild(todoCheckListItem);
    todoCheckList.appendChild(todoCheckListItemContainer);
  });
  return todoCheckList;
};

const todoItem = (projects, projectTitle, todo) => {
  const { id, title, ...items } = todo;
  const todoContainer = document.createElement("li");
  todoContainer.id = "todo-item";
  todoContainer.dataset.id = id;

  const todoHeader = document.createElement("h3");
  todoHeader.id = id;
  todoHeader.className = "todo-title";
  todoHeader.dataset.project = projectTitle;
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
    }
  }

  const checkListHeader = document.createElement("h4");
  checkListHeader.id = "check-list-title";
  checkListHeader.textContent = "Check List";

  todoItemsList.appendChild(checkListHeader);

  const todoCheckListElement = checkList(projects, todo.id, todo.checkList);
  todoItemsList.appendChild(todoCheckListElement);

  const newCheckListItemButton = document.createElement("button");
  newCheckListItemButton.id = id;
  newCheckListItemButton.className = "new-check-list-item-button";
  newCheckListItemButton.textContent = "New Check List Item";

  newCheckListItemButton.addEventListener("click", () => {
    console.log("New check list item button clicked");
    funcs.openNewCheckListItemModal(projects, id);
  });

  todoItemsList.appendChild(newCheckListItemButton);

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
    const todoItemElement = todoItem(projects, title, todo);
    todosList.appendChild(todoItemElement);
  });

  return todosList;
};

export default todos;
