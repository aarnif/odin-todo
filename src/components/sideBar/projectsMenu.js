import funcs from "./funcs.js";
import projectIcon from "../icons/project.js";
import todoIcon from "../icons/todo.js";
import updateIcon from "../icons/update.js";
import deleteIcon from "../icons/delete.js";
import plusIcon from "../icons/plus.js";

const projectMenuItemTitle = (projects, id, title) => {
  const projectTitleContainer = document.createElement("ul");
  projectTitleContainer.className = "flex-row-justify-start-items-center";

  const projectIconContainer = document.createElement("li");
  projectIconContainer.className = "flex-row-justify-center-items-center";

  const projectIconElement = projectIcon();
  projectIconElement.className = "pr-2";
  projectIconContainer.appendChild(projectIconElement);

  const projectTitleButtonContainer = document.createElement("li");
  projectTitleButtonContainer.className =
    "flex-row-justify-center-items-center";
  const projectTitleButton = document.createElement("button");
  projectTitleButton.id = id;
  projectTitleButton.className = "project-button project-menu-header mr-2";
  projectTitleButton.textContent = title;

  projectTitleButtonContainer.appendChild(projectTitleButton);
  projectTitleContainer.appendChild(projectTitleButtonContainer);

  const updateProjectButtonContainer = document.createElement("li");
  updateProjectButtonContainer.className =
    "flex-row-justify-center-items-center";
  const updateProjectButton = document.createElement("button");
  updateProjectButton.id = id;
  updateProjectButton.className = "update-project-button";

  const updateProjectIcon = updateIcon();
  updateProjectIcon.id = id;
  updateProjectIcon.className = "mr-2";

  updateProjectIcon.addEventListener("click", (e) => {
    console.log("Update project button clicked");
    const projectId = e.currentTarget.id;
    funcs.openUpdateProjectModal(projects, projectId);
  });

  updateProjectButton.appendChild(updateProjectIcon);

  updateProjectButtonContainer.appendChild(updateProjectButton);

  const deleteButtonContainer = document.createElement("li");
  deleteButtonContainer.className = "flex-row-justify-center-items-center";
  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.id = id;
  deleteProjectButton.className = "delete-project-button";

  const deleteProjectIcon = deleteIcon();
  deleteProjectIcon.id = id;

  console.log("deleteProjectIcon:", deleteProjectIcon);

  deleteProjectIcon.addEventListener("click", (e) => {
    console.log("Delete project button clicked");
    const projectId = e.currentTarget.id;
    funcs.openDeleteProjectModal(projects, projectId);
  });

  deleteProjectButton.appendChild(deleteProjectIcon);

  deleteButtonContainer.appendChild(deleteProjectButton);

  projectTitleContainer.appendChild(projectIconContainer);
  projectTitleContainer.appendChild(projectTitleButtonContainer);
  projectTitleContainer.appendChild(updateProjectButtonContainer);
  projectTitleContainer.appendChild(deleteButtonContainer);
  return projectTitleContainer;
};

const projectMenuItemTodos = (title, todos) => {
  const projectMenuItemTodosList = document.createElement("ul");

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    const todoItemList = document.createElement("ul");
    todoItemList.className = "flex-row-justify-start-items-center";

    const todoIconContainer = document.createElement("li");
    const todoIconElement = todoIcon();
    todoIconElement.className = "pr-2";
    todoIconContainer.appendChild(todoIconElement);

    const todoTitleContainer = document.createElement("li");
    todoTitleContainer.className = "header3";
    todoTitleContainer.textContent = todo.title;

    todoItemList.appendChild(todoIconContainer);
    todoItemList.appendChild(todoTitleContainer);

    todoItem.appendChild(todoItemList);

    projectMenuItemTodosList.appendChild(todoItem);
  });

  return projectMenuItemTodosList;
};

export const projectsMenuItem = (projects, project) => {
  const projectTitleContainer = document.createElement("li");

  const projectMenuItemTitleElement = projectMenuItemTitle(
    projects,
    project.id,
    project.title
  );
  const projectMenuItemTodosElement = projectMenuItemTodos(
    project.title,
    project.todos
  );

  projectTitleContainer.appendChild(projectMenuItemTitleElement);
  projectTitleContainer.appendChild(projectMenuItemTodosElement);

  return projectTitleContainer;
};

const newProjectButtonElement = (projects) => {
  const newProjectButtonContainer = document.createElement("div");
  newProjectButtonContainer.id = "new-project-button-container";
  newProjectButtonContainer.className = "new-project-button-container";
  const newProjectButton = document.createElement("button");
  newProjectButton.id = "new-project-button";
  newProjectButton.className = "button";

  const newProjectButtonIcon = plusIcon();
  newProjectButton.appendChild(newProjectButtonIcon);

  const newProjectButtonText = document.createElement("span");
  newProjectButtonText.textContent = "New Project";

  newProjectButton.appendChild(newProjectButtonText);

  newProjectButton.addEventListener("click", () => {
    console.log("New project button clicked");
    funcs.openNewProjectModal(projects);
  });

  newProjectButtonContainer.appendChild(newProjectButton);
  return newProjectButtonContainer;
};

const projectsMenu = (projects) => {
  const projectsList = document.createElement("ul");
  projectsList.id = "projects";

  const projectsListHeaderContainer = document.createElement("li");
  const projectsListHeader = document.createElement("h2");
  projectsListHeader.className = "header1";
  projectsListHeader.textContent = "Projects";

  projectsListHeaderContainer.appendChild(projectsListHeader);

  projectsList.appendChild(projectsListHeaderContainer);

  projects.forEach((project) => {
    if (project.title === "Inbox") return;
    const projectMenuItemElement = projectsMenuItem(projects, project);
    projectsList.appendChild(projectMenuItemElement);
  });

  return projectsList;
};

const addProjectsMenu = (projects) => {
  const menu = document.getElementById("menu");
  const projectsListItems = projectsMenu(projects);
  menu.appendChild(projectsListItems);

  const newProjectButtonContainer = newProjectButtonElement(projects);
  menu.appendChild(newProjectButtonContainer);

  const projectButtons = document.querySelectorAll(".project-button");

  projectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Project button clicked:", e.target.textContent);
      funcs.displayProjectTodos(projects, e.target.textContent);
    });
  });
};

export default addProjectsMenu;
