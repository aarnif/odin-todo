const projectMenuItemTitle = (id, title) => {
  const projectTitleContainer = document.createElement("li");
  const projectTitleButton = document.createElement("button");
  projectTitleButton.id = id;
  projectTitleButton.className = "project-button";
  projectTitleButton.textContent = title;

  projectTitleContainer.appendChild(projectTitleButton);
  return projectTitleContainer;
};

const projectMenuItemTodos = (title, todos) => {
  const projectMenuItemTodosList = document.createElement("ul");

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    const todoTitleButton = document.createElement("button");
    todoTitleButton.id = todo.id;
    todoTitleButton.dataset.project = title;
    todoTitleButton.className = "todo-button";
    todoTitleButton.textContent = todo.title;
    todoItem.appendChild(todoTitleButton);
    projectMenuItemTodosList.appendChild(todoItem);
  });

  return projectMenuItemTodosList;
};

const projectsMenuItem = (project) => {
  const projectTitleContainer = document.createElement("li");

  const projectMenuItemTitleElement = projectMenuItemTitle(
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

const newProjectButton = () => {
  const newProjectButtonContainer = document.createElement("li");
  const newProjectButton = document.createElement("button");
  newProjectButton.setAttribute("id", "new-project-button");
  newProjectButton.textContent = "New Project";

  newProjectButtonContainer.appendChild(newProjectButton);

  return newProjectButtonContainer;
};

const ProjectsMenu = (projects) => {
  const projectsList = document.createElement("ul");
  projectsList.id = "projects";

  const projectsListHeaderContainer = document.createElement("li");
  const projectsListHeader = document.createElement("h2");
  projectsListHeader.textContent = "Projects";

  projectsListHeaderContainer.appendChild(projectsListHeader);

  projectsList.appendChild(projectsListHeaderContainer);

  projects.forEach((project) => {
    const projectMenuItemElement = projectsMenuItem(project);
    projectsList.appendChild(projectMenuItemElement);
  });

  const newProjectButtonElement = newProjectButton();
  projectsList.appendChild(newProjectButtonElement);

  return projectsList;
};

export default ProjectsMenu;
