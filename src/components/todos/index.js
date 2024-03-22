import funcs from "./funcs.js";
import sidebarFuncs from "../sideBar/funcs.js";
import todoIcon from "../icons/todo.js";
import updateIcon from "../icons/update.js";
import deleteIcon from "../icons/delete.js";
import chevronUpIcon from "../icons/chevronUp.js";
import chevronDownIcon from "../icons/chevronDown.js";

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

  const markCompletedButtonContainer = document.createElement("li");
  const checkListMarkCompletedButton = document.createElement("button");

  checkListMarkCompletedButton.id = id;
  checkListMarkCompletedButton.className = "mark-completed-button";
  checkListMarkCompletedButton.textContent = "Mark Completed";

  checkListMarkCompletedButton.addEventListener("click", () => {
    console.log("Mark checklist item completed button clicked");
    funcs.markCheckListItemCompleted(projects, todoId, checkList, id);
  });

  markCompletedButtonContainer.appendChild(checkListMarkCompletedButton);

  checkListItemList.appendChild(markCompletedButtonContainer);

  const checkListButtonsContainer = document.createElement("li");

  const updateCheckListItemButton = document.createElement("button");
  updateCheckListItemButton.id = id;
  updateCheckListItemButton.className = "update-check-list-item-button pr-1";
  updateCheckListItemButton.textContent = "U";

  updateCheckListItemButton.addEventListener("click", () => {
    console.log("Update check list item button clicked");
    funcs.openUpdateCheckListItemModal(projects, todoId, checkList, id);
  });

  checkListButtonsContainer.appendChild(updateCheckListItemButton);

  const deleteCheckListItemButton = document.createElement("button");
  deleteCheckListItemButton.id = id;
  deleteCheckListItemButton.className = "delete-check-list-item-button";
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

const todoItemContent = (projects, id, items) => {
  const todoItemsList = document.createElement("ul");

  for (const [key, value] of Object.entries(items)) {
    if (key !== "checkList" && key !== "showContents") {
      const todoItemListElement = item(key, value);
      todoItemsList.appendChild(todoItemListElement);
    }
  }

  const markTodoCompletedButtonContainer = document.createElement("li");
  const todoMarkCompletedButton = document.createElement("button");

  todoMarkCompletedButton.id = id;
  todoMarkCompletedButton.className = "mark-completed-button";
  todoMarkCompletedButton.textContent = "Mark Completed";

  todoMarkCompletedButton.addEventListener("click", () => {
    console.log("Mark todo completed button clicked");
    funcs.markTodoCompleted(projects, id);
  });

  markTodoCompletedButtonContainer.appendChild(todoMarkCompletedButton);

  todoItemsList.appendChild(markTodoCompletedButtonContainer);

  const checkListHeader = document.createElement("h4");
  checkListHeader.id = "check-list-title";
  checkListHeader.textContent = "Check List";

  todoItemsList.appendChild(checkListHeader);

  const todoCheckListElement = checkList(projects, id, items.checkList);
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

  return todoItemsList;
};

const todoItem = (projects, projectTitle, todo) => {
  const { id, title, ...items } = todo;
  const todoContainer = document.createElement("li");
  todoContainer.id = "todo-item";
  todoContainer.className = "todo-item";
  todoContainer.dataset.id = id;

  const todoHeaderContainer = document.createElement("div");
  todoHeaderContainer.className = "todo-header-container";

  const todoTitleAndIconContainer = document.createElement("div");
  todoTitleAndIconContainer.className = "todo-title-and-icon-container";

  const todoIconElement = todoIcon();
  todoIconElement.className = "pr-2";
  todoTitleAndIconContainer.appendChild(todoIconElement);

  const todoTitle = document.createElement("h2");
  todoTitle.id = id;
  todoTitle.className = "header2";
  todoTitle.dataset.project = projectTitle;
  todoTitle.textContent = title;

  todoTitleAndIconContainer.appendChild(todoTitle);

  const updateTodoButton = document.createElement("button");
  updateTodoButton.id = id;
  updateTodoButton.className = "pl-2";

  const updateTodoIcon = updateIcon();

  updateTodoIcon.addEventListener("click", () => {
    console.log("Update todo button clicked");
    funcs.openUpdateTodoModal(projects, id);
  });

  updateTodoButton.appendChild(updateTodoIcon);

  todoTitleAndIconContainer.appendChild(updateTodoButton);

  const deleteTodoButton = document.createElement("button");
  deleteTodoButton.id = id;
  deleteTodoButton.className = "pl-2";

  const deleteTodoIcon = deleteIcon();

  deleteTodoIcon.addEventListener("click", () => {
    console.log("Delete todo button clicked");
    funcs.openDeleteTodoModal(projects, id);
  });

  deleteTodoButton.appendChild(deleteTodoIcon);

  todoTitleAndIconContainer.appendChild(deleteTodoButton);

  const showTodoContentButton = document.createElement("button");
  showTodoContentButton.id = id;
  showTodoContentButton.className = "show-todo-content-button";

  const showTodoContentIcon = todo.showContents
    ? chevronUpIcon()
    : chevronDownIcon();

  showTodoContentIcon.addEventListener("click", () => {
    console.log("Show todo content button clicked");
    todo.toggleShowContents();
    sidebarFuncs.displayProjectTodos(projects, projectTitle);
  });

  showTodoContentButton.appendChild(showTodoContentIcon);

  todoHeaderContainer.appendChild(todoTitleAndIconContainer);
  todoHeaderContainer.appendChild(showTodoContentButton);

  todoContainer.appendChild(todoHeaderContainer);

  if (todo.showContents) {
    const todoItemsList = todoItemContent(projects, id, items);
    todoContainer.appendChild(todoItemsList);
  }

  return todoContainer;
};

const todos = (projects, title, todos) => {
  const todosList = document.createElement("ul");
  const todosListHeader = document.createElement("h2");
  todosListHeader.id = "project-title";
  todosListHeader.className = "header1 mb-8 pr-2";
  todosListHeader.textContent = title;

  todosList.appendChild(todosListHeader);
  todos.forEach((todo) => {
    const todoItemElement = todoItem(projects, title, todo);
    todosList.appendChild(todoItemElement);
  });

  return todosList;
};

export default todos;
