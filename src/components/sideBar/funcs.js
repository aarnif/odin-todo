import projectService from "../../services/projectService.js";
import todoService from "../../services/todoService.js";
import todos from "../todos/index.js";
import addProjectsMenu from "./projectsMenu.js";
import deleteModal from "../deleteModal.js";
import projectModal from "../projectModal.js";

const emptyContent = () => {
  const content = document.getElementById("content");
  console.log("Emptying content");
  content.innerHTML = "";
};

const displayNewTodoButton = (display) => {
  const newTodoButton = document.getElementById("new-todo-button");
  if (display) {
    newTodoButton.style.display = "block";
    return;
  }
  newTodoButton.style.display = "none";
};

const displayTodosDueDate = (projects, todosPageTitle, dueDate) => {
  const content = document.getElementById("content");
  console.log("Displaying all todos due:", dueDate);
  emptyContent();
  const allTodosDueDate = todos(
    projects,
    todosPageTitle,
    todoService.getTodosDueBy(projects, dueDate)
  );
  content.appendChild(allTodosDueDate);

  displayNewTodoButton(false);
};

export const displayProjectTodos = (projects, projectTitle) => {
  const content = document.getElementById("content");
  console.log("Displaying todos for project:", projectTitle);
  const findProject = projectService.getProjectByTitle(projects, projectTitle);
  emptyContent();
  const allProjectTodosElement = todos(
    projects,
    projectTitle,
    findProject.getAllTodos()
  );
  content.appendChild(allProjectTodosElement);

  displayNewTodoButton(true);
};

export const displayTodo = (projects, id) => {
  const projectTitle = document.getElementById(id).dataset.project;
  const projectByTitle = projectService.getProjectByTitle(
    projects,
    projectTitle
  );
  const todoById = todos(projects, projectTitle, [projectByTitle.getTodo(id)]);
  console.log("Displaying todo by title:", projectByTitle.getTodo(id).title);
  emptyContent();
  content.appendChild(todoById);

  displayNewTodoButton(false);
};

export const updateProjectsMenu = (projects) => {
  const oldProjectsMenu = document.getElementById("projects");
  const newProjectButton = document.getElementById("new-project-button");
  newProjectButton.remove();
  oldProjectsMenu.remove();
  addProjectsMenu(projects);
};

const handleAddNewProject = (e, projects) => {
  const newProjectModal = document.getElementById("project-modal");
  const newProjectTitle = e.target.elements.title.value;
  console.log("New project title:", newProjectTitle);

  projectService.createNewProject(projects, newProjectTitle);
  updateProjectsMenu(projects);
  displayProjectTodos(projects, newProjectTitle);

  newProjectModal.close();
  document.body.removeChild(newProjectModal);
};

const openNewProjectModal = (projects) => {
  addNewProjectModal();
  const newProjectModal = document.getElementById("project-modal");
  const newProjectForm = document.getElementById("project-form");

  const cancelNewProjectButton = document.getElementById(
    "cancel-project-button"
  );

  cancelNewProjectButton.addEventListener("click", () => {
    console.log("Cancel new project button clicked");
    newProjectModal.close();
    document.body.removeChild(newProjectModal);
  });

  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddNewProject(e, projects);
  });
  newProjectModal.showModal();
};

const handleUpdateProject = (e, projects, getProject) => {
  const updateProjectModal = document.getElementById("project-modal");
  const oldProjectTitle = getProject.title;
  const newProjectTitle = e.target.elements.title.value;
  console.log("Update project title:", newProjectTitle);
  projectService.renameProject(projects, oldProjectTitle, newProjectTitle);
  updateProjectsMenu(projects);
  displayProjectTodos(projects, newProjectTitle);
  updateProjectModal.close();
  document.body.removeChild(updateProjectModal);
};

const addNewProjectModal = () => {
  const newProjectModalElement = projectModal();
  document.body.appendChild(newProjectModalElement);
};

const addUpdateProjectModal = (project) => {
  const updateProjectModalElement = projectModal(project);
  document.body.appendChild(updateProjectModalElement);
};

const openUpdateProjectModal = (projects, id) => {
  const getProject = projectService.getProjectById(projects, id);

  if (getProject.title === "Inbox") {
    console.log("Cannot update Inbox project");
    return;
  }

  addUpdateProjectModal(getProject);
  const updateProjectModal = document.getElementById("project-modal");
  const updateProjectForm = document.getElementById("project-form");
  updateProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUpdateProject(e, projects, getProject);
  });

  const cancelUpdateProjectButton = document.getElementById(
    "cancel-project-button"
  );

  cancelUpdateProjectButton.addEventListener("click", () => {
    console.log("Cancel update project button clicked");
    updateProjectModal.close();
    document.body.removeChild(updateProjectModal);
  });
  updateProjectModal.showModal();
};

const handleDeleteProject = (e, projects, project) => {
  console.log(projects);
  console.log("Remove project:", project.title);
  const deleteProjectModal = document.getElementById("delete-modal");
  projects = projectService.removeProject(projects, project.title);
  updateProjectsMenu(projects);
  displayProjectTodos(projects, "Inbox");
  deleteProjectModal.close();
};

const addDeleteProjectModal = (project) => {
  const deleteProjectModalElement = deleteModal(`Delete ${project.title}?`);
  document.body.appendChild(deleteProjectModalElement);
};

const openDeleteProjectModal = (projects, id) => {
  const getProject = projectService.getProjectById(projects, id);
  console.log("Try to delete project title:", getProject.title);

  if (
    ["Inbox", "Today", "This week", "This month"].includes(getProject.title)
  ) {
    console.log(`Cannot delete section: ${getProject.title}!`);
    return;
  }

  if (getProject.getAllTodos().length > 0) {
    console.log("Cannot delete project with todos");
    return;
  }

  addDeleteProjectModal(getProject);

  const deleteProjectModal = document.getElementById("delete-modal");
  const deleteProjectForm = document.getElementById("delete-form");
  deleteProjectModal.showModal();

  const cancelDeleteProjectButton = document.getElementById(
    "cancel-delete-button"
  );

  cancelDeleteProjectButton.addEventListener("click", () => {
    console.log("Cancel delete project button clicked");
    deleteProjectModal.close();
  });

  deleteProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleDeleteProject(e, projects, getProject);
  });

  deleteProjectModal.showModal();
};

export default {
  displayProjectTodos,
  displayTodosDueDate,
  displayTodo,
  openNewProjectModal,
  openUpdateProjectModal,
  openDeleteProjectModal,
};
