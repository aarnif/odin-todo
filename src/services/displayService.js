import todoService from "./todoService.js";
import projectService from "./projectService.js";
import projectsMenu from "../components/projectsMenu.js";
import todos from "../components/todos.js";
import newProjectModal from "../components/newProjectModal.js";
import newTodoModal from "../components/newTodoModal.js";
import updateTodoModal from "../components/updateTodoModal.js";
import { projectsMenuItem } from "../components/projectsMenu.js";
import footer from "../components/footer.js";
import { Todo } from "../projectsAndTodos/Todo.js";
import { v4 as uuid } from "uuid";

const content = document.getElementById("content");

const emptyContent = () => {
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

const displayUpdateTodoButton = (display) => {
  const updateTodoButton = document.getElementById("update-todo-button");
  if (display) {
    updateTodoButton.style.display = "block";
    return;
  }
  updateTodoButton.style.display = "none";
};

const displayTodosDueDate = (projects, todosPageTitle, dueDate) => {
  console.log("Displaying all todos due:", dueDate);
  emptyContent();
  const allTodosDueDate = todos(
    todosPageTitle,
    todoService.getTodosDueBy(projects, dueDate)
  );
  content.appendChild(allTodosDueDate);

  displayNewTodoButton(false);
  displayUpdateTodoButton(false);
};

const displayProjectTodos = (projects, projectTitle) => {
  console.log("Displaying todos for project:", projectTitle);
  const findProject = projectService.getProjectByTitle(projects, projectTitle);
  emptyContent();
  const allProjectTodosElement = todos(projectTitle, findProject.getAllTodos());
  content.appendChild(allProjectTodosElement);

  displayNewTodoButton(true);
  displayUpdateTodoButton(false);
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

  displayNewTodoButton(false);
  displayUpdateTodoButton(true);
};

const displayProjectMenu = (projects) => {
  const menu = document.getElementById("menu");
  const projectsListItems = projectsMenu(projects);
  menu.appendChild(projectsListItems);
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

const addNewProjectModal = () => {
  const newProjectModalElement = newProjectModal();
  document.body.appendChild(newProjectModalElement);
};

const addNewTodoModal = () => {
  const newTodoModalElement = newTodoModal();
  document.body.appendChild(newTodoModalElement);
};

const addUpdateTodoModal = (todo) => {
  const updateTodoModalElement = updateTodoModal(todo);
  document.body.appendChild(updateTodoModalElement);
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

const handleAddNewTodo = (e, projects) => {
  const newTodoModal = document.getElementById("new-todo-modal");
  const projectTitle = document.getElementById("project-title").textContent;
  const findProject = projectService.getProjectByTitle(projects, projectTitle);

  const newTodo = new Todo(
    uuid(),
    e.target.elements.title.value,
    e.target.elements.description.value,
    e.target.elements.dueDate.value,
    e.target.elements.priority.value
  );

  console.log("New todo title:", newTodo.title);

  findProject.addNewTodo(newTodo);
  updateContent(projects, projectTitle);
  newTodoModal.close();
};

const openNewTodoModal = (projects) => {
  const newTodoModal = document.getElementById("new-todo-modal");
  const newTodoForm = document.getElementById("new-todo-form");
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddNewTodo(e, projects);
  });
  newTodoModal.showModal();
};

const handleUpdateTodo = (e, projects, project, todoId) => {
  const updateTodoModal = document.getElementById("update-todo-modal");

  const updatedTodo = new Todo(
    todoId,
    e.target.elements.title.value,
    e.target.elements.description.value,
    e.target.elements.dueDate.value,
    e.target.elements.priority.value
  );

  project.updateTodo(todoId, updatedTodo);

  updateContent(projects, project.title);
  displayTodo(projects, todoId);

  updateTodoModal.close();
};

const openUpdateTodoModal = (projects) => {
  const projectTitle = document.getElementById("project-title").textContent;
  const findProject = projectService.getProjectByTitle(projects, projectTitle);
  const todoId = document.getElementById("todo-item").dataset.id;
  const findTodo = findProject.getTodo(todoId);

  addUpdateTodoModal(findTodo);

  const updateTodoModal = document.getElementById("update-todo-modal");
  const updateTodoForm = document.getElementById("update-todo-form");
  updateTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUpdateTodo(e, projects, findProject, todoId);
  });
  updateTodoModal.showModal();
};

const addFooter = () => {
  const contentAndFooter = document.getElementById("content-and-footer");
  const footerElement = footer();
  contentAndFooter.appendChild(footerElement);
};

const loadContent = (projects) => {
  addFooter();
  displayProjectMenu(projects);
  displayProjectTodos(projects, "Inbox");
  addNewProjectModal();
  addNewTodoModal();
  addEventListeners(projects);
};

const updateContent = (projects, projectTitle) => {
  const projectsMenu = document.getElementById("projects");
  projectsMenu.remove();
  emptyContent();
  displayProjectMenu(projects);
  displayProjectTodos(projects, projectTitle);
  addEventListeners(projects);
};

const addEventListeners = (projects) => {
  const newProjectModal = document.getElementById("new-project-modal");
  const newTodoModal = document.getElementById("new-todo-modal");

  const inboxButton = document.getElementById("inbox");
  const todayButton = document.getElementById("today");
  const thisWeekButton = document.getElementById("week");
  const thisMonthButton = document.getElementById("month");
  const projectButtons = document.querySelectorAll(".project-button");
  const todoButtons = document.querySelectorAll(".todo-button");

  const newProjectButton = document.getElementById("new-project-button");
  const cancelNewProjectButton = document.getElementById(
    "cancel-project-button"
  );

  const newTodoButton = document.getElementById("new-todo-button");
  const cancelNewTodoButton = document.getElementById("cancel-new-todo-button");

  const updateTodoButton = document.getElementById("update-todo-button");
  const cancelUpdateTodoButton = document.getElementById(
    "cancel-update-todo-button"
  );

  inboxButton.addEventListener("click", (e) => {
    console.log("Inbox button clicked");
    displayProjectTodos(projects, e.target.textContent);
  });

  todayButton.addEventListener("click", (e) => {
    console.log("Today button clicked");
    displayTodosDueDate(projects, e.target.textContent, new Date());
  });

  thisWeekButton.addEventListener("click", (e) => {
    console.log("This week button clicked");
    displayTodosDueDate(projects, e.target.textContent, endOfWeek(new Date()));
  });

  thisMonthButton.addEventListener("click", (e) => {
    console.log("This month button clicked");
    displayTodosDueDate(projects, e.target.textContent, endOfMonth(new Date()));
  });

  projectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Project button clicked:", e.target.textContent);
      displayProjectTodos(projects, e.target.textContent);
    });
  });

  todoButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Todo button clicked:", e.target.textContent);
      displayTodo(projects, e.target.id);
    });
  });

  newProjectButton.addEventListener("click", () => {
    console.log("New project button clicked");
    openNewProjectModal(projects);
  });

  cancelNewProjectButton.addEventListener("click", () => {
    console.log("Cancel new project button clicked");
    newProjectModal.close();
  });

  newTodoButton.addEventListener("click", () => {
    console.log("New todo button clicked");
    openNewTodoModal(projects);
  });

  cancelNewTodoButton.addEventListener("click", () => {
    console.log("Cancel new todo button clicked");
    newTodoModal.close();
  });

  updateTodoButton.addEventListener("click", () => {
    console.log("Update todo button clicked");
    openUpdateTodoModal(projects);
  });
};

export default {
  emptyContent,
  displayTodosDueDate,
  displayProjectTodos,
  displayTodo,
  displayProjectMenu,
  addNewProjectModal,
  addNewTodoModal,
  addUpdateTodoModal,
  addProjectToProjectMenu,
  openNewProjectModal,
  openNewTodoModal,
  openUpdateTodoModal,
  addFooter,
  loadContent,
  addEventListeners,
};
