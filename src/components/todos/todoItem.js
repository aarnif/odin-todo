import funcs from "./funcs.js";
import sidebarFuncs from "../sideBar/funcs.js";
import todoIcon from "../icons/todo.js";
import updateIcon from "../icons/update.js";
import deleteIcon from "../icons/delete.js";
import chevronUpIcon from "../icons/chevronUp.js";
import chevronDownIcon from "../icons/chevronDown.js";
import addCheckListToTodoItem from "./checkListItem.js";

const item = (key, value) => {
  const todoItem = document.createElement("li");
  todoItem.textContent = `${key}: ${value}`;
  return todoItem;
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

  addCheckListToTodoItem(projects, id, todoItemsList, items.checkList);

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

export default todoItem;
