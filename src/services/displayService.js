import todoService from "./todoService.js";
import projectService from "./projectService.js";
import projectsMenu from "../components/projectsMenu.js";
import todos from "../components/todos.js";
import newProjectModal from "../components/newProjectModal.js";
import newTodoModal from "../components/newTodoModal.js";
import { projectsMenuItem } from "../components/projectsMenu.js";

const emptyContent = () => {
  console.log("Emptying content");
  content.innerHTML = "";
};

const displayTodosDueDate = (projects, todosPageTitle, dueDate) => {
  console.log("Displaying all todos due:", dueDate);
  emptyContent();
  const allTodosDueDate = todos(
    todosPageTitle,
    todoService.getTodosDueBy(projects, dueDate)
  );
  content.appendChild(allTodosDueDate);
};

const displayProjectTodos = (projects, projectTitle) => {
  console.log("Displaying todos for project:", projectTitle);
  const findProject = projectService.getProjectByTitle(projects, projectTitle);
  emptyContent();
  const allProjectTodosElement = todos(projectTitle, findProject.getAllTodos());
  content.appendChild(allProjectTodosElement);
};

const displayTodo = (projects, id) => {
  const projectTitle = document.getElementById(id).dataset.project;
  const projectByTitle = projectService.getProjectByTitle(
    projects,
    projectTitle
  );
  const todoById = todos(projectTitle, [projectByTitle.getTodo(id)]);
  console.log("Displaying todo by title:", projectByTitle.getTodo(id).title);
  emptyContent();
  content.appendChild(todoById);
};

const displayProjectMenu = (projects) => {
  const menu = document.getElementById("menu");
  const projectsListItems = projectsMenu(projects);
  menu.appendChild(projectsListItems);
};

const addNewProjectModal = () => {
  const newProjectModalElement = newProjectModal();
  document.body.appendChild(newProjectModalElement);
};

const addNewTodoModal = () => {
  const newTodoModalElement = newTodoModal();
  document.body.appendChild(newTodoModalElement);
};

const addProjectToProjectMenu = (projects, project) => {
  console.log("Adding project to project menu:", project);
  const projectsList = document.getElementById("projects");
  const projectMenuItemElement = projectsMenuItem(project);

  const projectTitleButton =
    projectMenuItemElement.querySelector(".project-button");

  projectTitleButton.addEventListener("click", (e) => {
    console.log("Project button clicked:", e.target.textContent);
    displayProjectTodos(projects, e.target.textContent);
  });

  projectsList.appendChild(projectMenuItemElement);
};

const handleAddNewProject = (e, projects) => {
  const newProjectModal = document.getElementById("new-project-modal");
  const newProjectTitle = e.target.elements.title.value;
  console.log("New project title:", newProjectTitle);

  projectService.createNewProject(projects, newProjectTitle);
  const findNewProject = projectService.getProjectByTitle(
    projects,
    newProjectTitle
  );
  addProjectToProjectMenu(projects, findNewProject);

  newProjectModal.close();
};

const openNewProjectModal = (projects) => {
  const newProjectModal = document.getElementById("new-project-modal");
  const newProjectForm = document.getElementById("new-project-form");
  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddNewProject(e, projects);
  });
  newProjectModal.showModal();
};

const handleAddNewTodo = () => {
  const newTodoModal = document.getElementById("new-todo-modal");
  newTodoModal.close();
};

const openNewTodoModal = () => {
  const newTodoModal = document.getElementById("new-todo-modal");
  const newTodoForm = document.getElementById("new-todo-form");
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddNewTodo();
  });
  newTodoModal.showModal();
};

export default {
  emptyContent,
  displayTodosDueDate,
  displayProjectTodos,
  displayTodo,
  displayProjectMenu,
  addNewProjectModal,
  addNewTodoModal,
  addProjectToProjectMenu,
  openNewProjectModal,
  openNewTodoModal,
};
