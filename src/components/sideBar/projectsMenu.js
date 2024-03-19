import funcs from "./funcs.js";

const projectMenuItemTitle = (projects, id, title) => {
  const projectTitleContainer = document.createElement("li");
  const projectTitleButton = document.createElement("button");
  projectTitleButton.id = id;
  projectTitleButton.className = "project-button";
  projectTitleButton.textContent = title;

  const updateProjectButton = document.createElement("button");
  updateProjectButton.id = id;
  updateProjectButton.className = "update-project-button pl-1";
  updateProjectButton.textContent = "U";

  updateProjectButton.addEventListener("click", (e) => {
    console.log("Update project button clicked");
    const projectId = e.target.id;
    funcs.openUpdateProjectModal(projects, projectId);
  });

  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.id = id;
  deleteProjectButton.className = "delete-project-button pl-1";
  deleteProjectButton.textContent = "D";

  deleteProjectButton.addEventListener("click", (e) => {
    console.log("Delete project button clicked");
    const projectId = e.target.id;
    funcs.openDeleteProjectModal(projects, projectId);
  });

  projectTitleContainer.appendChild(projectTitleButton);
  projectTitleContainer.appendChild(updateProjectButton);
  projectTitleContainer.appendChild(deleteProjectButton);
  return projectTitleContainer;
};

const projectMenuItemTodos = (title, todos) => {
  const projectMenuItemTodosList = document.createElement("ul");

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.textContent = todo.title;
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
  const newProjectButton = document.createElement("button");
  newProjectButton.id = "new-project-button";
  newProjectButton.textContent = "New Project";

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
