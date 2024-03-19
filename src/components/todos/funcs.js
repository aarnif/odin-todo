import deleteModal from "../modals/delete.js";
import todoModal from "../modals/todo.js";
import projectService from "../../services/projectService.js";
import { Todo } from "../../projectsAndTodos/Todo.js";
import { v4 as uuid } from "uuid";
import { updateProjectsMenu, displayProjectTodos } from "../sideBar/funcs.js";
import checkListItemModal from "../modals/checkListItem.js";
import addNotificationModal from "../modals/notification.js";

const handleUpdateTodo = (e, projects, project, oldTodo, todoId) => {
  const updateTodoModal = document.getElementById("todo-modal");

  const updatedTodo = new Todo(
    todoId,
    e.target.elements.title.value,
    e.target.elements.description.value,
    e.target.elements.dueDate.value,
    e.target.elements.priority.value,
    oldTodo.completed,
    oldTodo.showContents
  );

  oldTodo.checkList.forEach((item) => {
    updatedTodo.addCheckListItem(item.id, item.description, item.completed);
  });

  project.updateTodo(todoId, updatedTodo);

  updateProjectsMenu(projects);
  displayProjectTodos(projects, project.title);

  updateTodoModal.close();
  document.body.removeChild(updateTodoModal);
};

const addUpdateTodoModal = (todo) => {
  const updateTodoModalElement = todoModal(todo);
  document.body.appendChild(updateTodoModalElement);
};

const openUpdateTodoModal = (projects, id) => {
  const projectTitle = document.getElementById("project-title").textContent;
  const getProject = projectService.getProjectByTitle(projects, projectTitle);
  const findTodo = getProject.getTodo(id);

  addUpdateTodoModal(findTodo);

  const updateTodoModal = document.getElementById("todo-modal");
  const updateTodoForm = document.getElementById("todo-form");

  const cancelUpdateTodoButton = document.getElementById("cancel-todo-button");

  cancelUpdateTodoButton.addEventListener("click", () => {
    console.log("Cancel update todo button clicked");
    document.body.removeChild(updateTodoModal);
    updateTodoModal.close();
  });

  updateTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUpdateTodo(e, projects, getProject, findTodo, id);
  });
  updateTodoModal.showModal();
};

const handleDeleteTodo = (e, projects, project, todoId) => {
  const deleteTodoModal = document.getElementById("delete-modal");
  project.removeTodo(todoId);
  updateProjectsMenu(projects);
  displayProjectTodos(projects, project.title);
  deleteTodoModal.close();
  document.body.removeChild(deleteTodoModal);
};

const addDeleteTodoModal = (todo) => {
  const deleteTodoModalElement = deleteModal(`Delete ${todo.title}?`);
  document.body.appendChild(deleteTodoModalElement);
};

const openDeleteTodoModal = (projects, id) => {
  const projectTitle = document.getElementById("project-title").textContent;
  const getProject = projectService.getProjectByTitle(projects, projectTitle);
  const findTodo = getProject.getTodo(id);

  if (findTodo.getAllCheckListItems().length > 0) {
    addNotificationModal(
      "Cannot delete todo with uncompleted check list items!"
    );
    console.log("Cannot delete todo with uncompleted check list items!");
    return;
  }

  addDeleteTodoModal(findTodo);

  const deleteTodoModal = document.getElementById("delete-modal");
  const deleteTodoForm = document.getElementById("delete-form");

  const cancelDeleteTodoButton = document.getElementById(
    "cancel-delete-button"
  );

  cancelDeleteTodoButton.addEventListener("click", () => {
    console.log("Cancel delete todo button clicked");
    deleteTodoModal.close();
  });

  deleteTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleDeleteTodo(e, projects, getProject, id);
  });
  deleteTodoModal.showModal();
};

const addUpdateCheckListItemModal = (checkListItem) => {
  const updateCheckListIitemModalElement = checkListItemModal(checkListItem);
  document.body.appendChild(updateCheckListIitemModalElement);
};

const handleUpdateCheckListItem = (e, projects, todoId, checkListItem, id) => {
  const updateCheckListItemModal = document.getElementById(
    "check-list-item-modal"
  );
  const projectTitle = document.getElementById("project-title").textContent;

  const getProject = projectService.getProjectByTitle(projects, projectTitle);
  const getTodo = getProject.getTodo(todoId);

  const updatedCheckListItemContents = {
    description: e.target.elements["check-list-item"].value,
    completed: checkListItem.completed,
  };

  getTodo.updateCheckListItem(id, updatedCheckListItemContents);

  console.log("Update check list item form submitted");

  displayProjectTodos(projects, projectTitle);

  updateCheckListItemModal.close();
  document.body.removeChild(updateCheckListItemModal);
};

const openUpdateCheckListItemModal = (projects, todoId, checkListItem, id) => {
  console.log(checkListItem);
  addUpdateCheckListItemModal(checkListItem);

  const updateCheckListItemModal = document.getElementById(
    "check-list-item-modal"
  );

  const updateCheckListItemForm = document.getElementById(
    "check-list-item-form"
  );

  const cancelUpdateCheckListItemButton = document.getElementById(
    "cancel-checklist-item-button"
  );

  cancelUpdateCheckListItemButton.addEventListener("click", () => {
    console.log("Cancel update check list item button clicked");
    document.body.removeChild(updateCheckListItemModal);
    updateCheckListItemModal.close();
  });

  updateCheckListItemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUpdateCheckListItem(e, projects, todoId, checkListItem, id);
  });

  updateCheckListItemModal.showModal();
};

const addDeleteCheckListItemModal = (checkListItem) => {
  const deleteTodoModalElement = deleteModal(
    `Delete item: ${checkListItem.description}?`
  );
  document.body.appendChild(deleteTodoModalElement);
};

const handleDeleteCheckListItem = (e, projects, todoId, checkListItem, id) => {
  const deleteCheckListItemModal = document.getElementById("delete-modal");
  const projectTitle = document.getElementById("project-title").textContent;

  const getProject = projectService.getProjectByTitle(projects, projectTitle);
  const getTodo = getProject.getTodo(todoId);

  getTodo.removeCheckListItem(id);

  console.log("Delete check list item form submitted");

  displayProjectTodos(projects, projectTitle);

  deleteCheckListItemModal.close();
  document.body.removeChild(deleteCheckListItemModal);
};

const openDeleteCheckListItemModal = (projects, todoId, checkListItem, id) => {
  console.log(checkListItem);
  addDeleteCheckListItemModal(checkListItem);

  const deleteCheckListItemModal = document.getElementById("delete-modal");

  const updateCheckListItemForm = document.getElementById("delete-form");

  const cancelUpdateCheckListItemButton = document.getElementById(
    "cancel-delete-button"
  );

  cancelUpdateCheckListItemButton.addEventListener("click", () => {
    console.log("Cancel delete check list item button clicked");
    deleteCheckListItemModal.close();
  });

  updateCheckListItemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleDeleteCheckListItem(e, projects, todoId, checkListItem, id);
  });

  deleteCheckListItemModal.showModal();
};

const addNewCheckListItemModal = () => {
  const deleteTodoModalElement = checkListItemModal();
  document.body.appendChild(deleteTodoModalElement);
};

const handleNewCheckListItem = (e, projects, todoId) => {
  const newCheckListItemModal = document.getElementById(
    "check-list-item-modal"
  );
  const projectTitle = document.getElementById("project-title").textContent;

  const getProject = projectService.getProjectByTitle(projects, projectTitle);
  const getTodo = getProject.getTodo(todoId);

  const newCheckListItemContents = {
    id: uuid(),
    description: e.target.elements["check-list-item"].value,
    completed: false,
  };

  getTodo.addCheckListItem(
    newCheckListItemContents.id,
    newCheckListItemContents.description,
    newCheckListItemContents.completed
  );

  console.log("New check list item form submitted");

  displayProjectTodos(projects, projectTitle);

  newCheckListItemModal.close();
  document.body.removeChild(newCheckListItemModal);
};

const openNewCheckListItemModal = (projects, todoId) => {
  addNewCheckListItemModal();
  const newCheckListItemModal = document.getElementById(
    "check-list-item-modal"
  );
  const newCheckListItemForm = document.getElementById("check-list-item-form");

  const cancelNewCheckListItemButton = document.getElementById(
    "cancel-checklist-item-button"
  );

  cancelNewCheckListItemButton.addEventListener("click", () => {
    console.log("Cancel new check list item button clicked");
    document.body.removeChild(newCheckListItemModal);
    newCheckListItemModal.close();
  });

  newCheckListItemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleNewCheckListItem(e, projects, todoId);
  });

  newCheckListItemModal.showModal();
};

const markCheckListItemCompleted = (projects, todoId, checkList, id) => {
  const projectTitle = document.getElementById("project-title").textContent;
  const getProject = projectService.getProjectByTitle(projects, projectTitle);
  const getTodo = getProject.getTodo(todoId);
  getTodo.markCheckListItemCompleted(id);
  displayProjectTodos(projects, projectTitle);
};

const markTodoCompleted = (projects, id) => {
  const projectTitle = document.getElementById("project-title").textContent;
  const getProject = projectService.getProjectByTitle(projects, projectTitle);
  const getTodo = getProject.getTodo(id);

  if (!getTodo.completed && getTodo.getAllCheckListItems().length > 0) {
    addNotificationModal(
      "Cannot mark complete todo with uncompleted check list items!"
    );
    console.log("Cannot mark complete todo with uncompleted check list items!");
    return;
  }

  getTodo.toggleCompleted();
  updateProjectsMenu(projects);
  displayProjectTodos(projects, projectTitle);
};

export default {
  openUpdateTodoModal,
  openDeleteTodoModal,
  openUpdateCheckListItemModal,
  openDeleteCheckListItemModal,
  openNewCheckListItemModal,
  markCheckListItemCompleted,
  markTodoCompleted,
};
