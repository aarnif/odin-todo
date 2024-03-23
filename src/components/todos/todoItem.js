import funcs from "./funcs.js";
import sidebarFuncs from "../sideBar/funcs.js";
import todoIcon from "../icons/todo.js";
import updateIcon from "../icons/update.js";
import deleteIcon from "../icons/delete.js";
import chevronUpIcon from "../icons/chevronUp.js";
import chevronDownIcon from "../icons/chevronDown.js";
import addCheckListToTodoItem from "./checkListItem.js";

const todoPriority = (priority) => {
  let textColor = "";
  let backgroundColor = "";
  switch (priority) {
    case "Low":
      textColor = "text-green-700";
      backgroundColor = "bg-green-200";
      break;
    case "Medium":
      textColor = "text-yellow-700";
      backgroundColor = "bg-yellow-200";
      break;
    case "High":
      textColor = "text-red-700";
      backgroundColor = "bg-red-200";
      break;
    default:
      textColor = "text-green-700";
      backgroundColor = "bg-green-200";
  }
  const todoPriority = document.createElement("h3");
  todoPriority.className = `w-[100px] ml-2 header3 ${backgroundColor} ${textColor} text-center rounded-full`;
  todoPriority.textContent = priority;

  return todoPriority;
};

const todoItemContent = (projects, id, items) => {
  const todoItemsList = document.createElement("ul");

  const todoDescription = document.createElement("li");
  todoDescription.className = "mt-2 mb-12 header3";

  const todoDescriptionTitle = document.createElement("h2");
  todoDescriptionTitle.textContent = items.description;

  const todoTimeLeft = document.createElement("h3");
  todoTimeLeft.className = "header3 text-slate-500";
  todoTimeLeft.textContent = items.timeLeft;

  todoDescription.appendChild(todoDescriptionTitle);
  todoDescription.appendChild(todoTimeLeft);
  todoItemsList.appendChild(todoDescription);

  addCheckListToTodoItem(projects, id, todoItemsList, items.checkList);

  const markTodoCompletedButtonContainer = document.createElement("li");
  markTodoCompletedButtonContainer.className =
    "mark-todo-completed-button-container";
  const todoMarkCompletedButton = document.createElement("button");

  todoMarkCompletedButton.id = id;
  todoMarkCompletedButton.className = "mark-todo-completed-button";
  todoMarkCompletedButton.textContent = "Mark Completed";

  todoMarkCompletedButton.addEventListener("click", () => {
    console.log("Mark todo completed button clicked");
    funcs.markTodoCompleted(projects, id);
  });

  markTodoCompletedButtonContainer.appendChild(todoMarkCompletedButton);

  todoItemsList.appendChild(markTodoCompletedButtonContainer);

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

  if (todo.completed) {
    todoTitle.className = "header2 text-slate-500 line-through";
  }

  todoTitleAndIconContainer.appendChild(todoTitle);

  const todoPriorityElement = todoPriority(items.priority);
  todoTitleAndIconContainer.appendChild(todoPriorityElement);

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
