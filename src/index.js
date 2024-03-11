import "./styles.css";
import { projects } from "./data.js";
import { getProjectByTitle, createNewProject } from "./utils/projectService.js";
import { getAllTodos, getTodosDueBy } from "./utils/todoService.js";
import ProjectsMenu, { projectsMenuItem } from "./components/ProjectsMenu.js";
import Todos from "./components/Todos.js";
import { endOfWeek, endOfMonth } from "date-fns";

const content = document.getElementById("content");
const newProjectModal = document.getElementById("new-project-modal");

const emptyContent = () => {
  console.log("Emptying content");
  content.innerHTML = "";
};

const displayAllTodos = (todosPageTitle) => {
  console.log("Displaying all todos");
  emptyContent();
  const allTodos = Todos(todosPageTitle, getAllTodos(projects));
  content.appendChild(allTodos);
};

const displayTodosDueDate = (todosPageTitle, dueDate) => {
  console.log("Displaying all todos due:", dueDate);
  emptyContent();
  const allTodosDueDate = Todos(
    todosPageTitle,
    getTodosDueBy(projects, dueDate)
  );
  content.appendChild(allTodosDueDate);
};

const displayProjectTodos = (project) => {
  console.log("Displaying todos for project:", project);
  emptyContent();
  const allTodosByProject = Todos(
    project,
    getAllTodos([getProjectByTitle(projects, project)])
  );
  content.appendChild(allTodosByProject);
};

const displayTodo = (id) => {
  const projectTitle = document.getElementById(id).dataset.project;
  const projectByTitle = getProjectByTitle(projects, projectTitle);
  const todoById = Todos(projectTitle, [projectByTitle.getTodo(id)]);
  emptyContent();
  content.appendChild(todoById);
};

const displayProjectMenu = () => {
  const menu = document.getElementById("menu");
  const projectsListItems = ProjectsMenu(projects);
  menu.appendChild(projectsListItems);
};

const addProjectToProjectMenu = (project) => {
  console.log("Adding project to project menu:", project);
  const projectsList = document.getElementById("projects");
  const projectMenuItemElement = projectsMenuItem(project);

  const projectTitleButton =
    projectMenuItemElement.querySelector(".project-button");

  projectTitleButton.addEventListener("click", (e) => {
    console.log("Project button clicked:", e.target.textContent);
    displayProjectTodos(e.target.textContent);
  });
  projectsList.appendChild(projectMenuItemElement);
};

const handleAddNewProject = () => {
  const submitProjectButton = document.getElementById("submit-project-button");
  submitProjectButton.addEventListener("click", handleCloseNewProjectModal);
  newProjectModal.showModal();
};

const handleCloseNewProjectModal = () => {
  const newProjectTitle = document.getElementById("new-project").value;
  if (newProjectTitle) {
    createNewProject(projects, newProjectTitle);
  }
  const newProject = getProjectByTitle(projects, newProjectTitle);
  addProjectToProjectMenu(newProject);
  console.log(projects);
  newProjectModal.close();
};

const loadContent = () => {
  displayProjectMenu();
};

loadContent();

const inboxButton = document.getElementById("inbox");
const todayButton = document.getElementById("today");
const thisWeekButton = document.getElementById("week");
const thisMonthButton = document.getElementById("month");

const projectButtons = document.querySelectorAll(".project-button");
const todoButtons = document.querySelectorAll(".todo-button");
const newProjectButton = document.getElementById("new-project-button");

inboxButton.addEventListener("click", (e) => {
  console.log("Inbox button clicked");
  displayAllTodos(e.target.textContent);
});

todayButton.addEventListener("click", (e) => {
  console.log("Today button clicked");
  displayTodosDueDate(e.target.textContent, new Date());
});

thisWeekButton.addEventListener("click", (e) => {
  console.log("This week button clicked");
  displayTodosDueDate(e.target.textContent, endOfWeek(new Date()));
});

thisMonthButton.addEventListener("click", (e) => {
  console.log("This month button clicked");
  displayTodosDueDate(e.target.textContent, endOfMonth(new Date()));
});

projectButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("Project button clicked:", e.target.textContent);
    displayProjectTodos(e.target.textContent);
  });
});

todoButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("Todo button clicked:", e.target.textContent);
    displayTodo(e.target.id);
  });
});

newProjectButton.addEventListener("click", () => {
  console.log("New project button clicked");
  handleAddNewProject();
});
