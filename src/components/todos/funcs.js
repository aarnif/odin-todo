import updateTodoModal from "../updateTodoModal.js";
import deleteTodoModal from "../deleteTodoModal.js";
import projectService from "../../services/projectService.js";
import { Todo } from "../../projectsAndTodos/Todo.js";
import { v4 as uuid } from "uuid";
import { updateProjectsMenu, displayProjectTodos } from "../sideBar/funcs.js";

const handleUpdateTodo = (e, projects, project, todoId) => {
  const updateTodoModal = document.getElementById("update-todo-modal");

  const updatedTodo = new Todo(
    todoId,
    e.target.elements.title.value,
    e.target.elements.description.value,
    e.target.elements.dueDate.value,
    e.target.elements.priority.value
  );

  const checkListItems = document.querySelectorAll("#update-checkListItem");

  checkListItems.forEach((item) => {
    updatedTodo.addCheckListItem(uuid(), item.value);
  });

  project.updateTodo(todoId, updatedTodo);

  updateProjectsMenu(projects);
  displayProjectTodos(projects, project.title);

  updateTodoModal.close();
  document.body.removeChild(updateTodoModal);
};

const addUpdateTodoModal = (todo) => {
  const updateTodoModalElement = updateTodoModal(todo);
  document.body.appendChild(updateTodoModalElement);
};

const openUpdateTodoModal = (projects, id) => {
  const projectTitle = document.getElementById("project-title").textContent;
  const getProject = projectService.getProjectByTitle(projects, projectTitle);
  const findTodo = getProject.getTodo(id);

  addUpdateTodoModal(findTodo);

  const updateTodoModal = document.getElementById("update-todo-modal");
  const updateTodoForm = document.getElementById("update-todo-form");

  const cancelUpdateTodoButton = document.getElementById(
    "cancel-update-todo-button"
  );

  cancelUpdateTodoButton.addEventListener("click", () => {
    console.log("Cancel update todo button clicked");
    updateTodoModal.close();
  });

  updateTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUpdateTodo(e, projects, getProject, id);
  });
  updateTodoModal.showModal();
};

const handleDeleteTodo = (e, projects, project, todoId) => {
  const deleteTodoModal = document.getElementById("delete-todo-modal");
  project.removeTodo(todoId);
  updateProjectsMenu(projects);
  displayProjectTodos(projects, project.title);
  deleteTodoModal.close();
  document.body.removeChild(deleteTodoModal);
};

const addDeleteTodoModal = (todo) => {
  const deleteTodoModalElement = deleteTodoModal(todo);
  document.body.appendChild(deleteTodoModalElement);
};

const openDeleteTodoModal = (projects, id) => {
  const projectTitle = document.getElementById("project-title").textContent;
  const getProject = projectService.getProjectByTitle(projects, projectTitle);
  const findTodo = getProject.getTodo(id);

  addDeleteTodoModal(findTodo);

  const deleteTodoModal = document.getElementById("delete-todo-modal");
  const deleteTodoForm = document.getElementById("delete-todo-form");

  const cancelDeleteTodoButton = document.getElementById(
    "cancel-delete-todo-button"
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

export default { openUpdateTodoModal, openDeleteTodoModal };
