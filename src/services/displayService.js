import todoService from "./todoService.js";
import projectService from "./projectService.js";
import projectsMenu from "../components/projectsMenu.js";
import todos from "../components/todos.js";
import newProjectModal from "../components/newProjectModal.js";
import updateProjectModal from "../components/updateProjectModal.js";
import deleteProjectModal from "../components/deleteProjectModal.js";
import newTodoModal from "../components/newTodoModal.js";
import updateTodoModal from "../components/updateTodoModal.js";
import deleteTodoModal from "../components/deleteTodoModal.js";
import { projectsMenuItem } from "../components/projectsMenu.js";
import footer from "../components/footer.js";
import { Todo } from "../projectsAndTodos/Todo.js";
import { v4 as uuid } from "uuid";
import { endOfWeek, endOfMonth } from "date-fns";

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

const displayDeleteTodoButton = (display) => {
  const deleteTodoButton = document.getElementById("delete-todo-button");
  if (display) {
    deleteTodoButton.style.display = "block";
    return;
  }
  deleteTodoButton.style.display = "none";
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
  displayDeleteTodoButton(false);
};

const displayProjectTodos = (projects, projectTitle) => {
  console.log("Displaying todos for project:", projectTitle);
  const findProject = projectService.getProjectByTitle(projects, projectTitle);
  emptyContent();
  const allProjectTodosElement = todos(projectTitle, findProject.getAllTodos());
  content.appendChild(allProjectTodosElement);

  displayNewTodoButton(true);
  displayUpdateTodoButton(false);
  displayDeleteTodoButton(false);
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
  displayDeleteTodoButton(true);
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

const addUpdateProjectModal = (project) => {
  const updateProjectModalElement = updateProjectModal(project);
  document.body.appendChild(updateProjectModalElement);
};

const addDeleteProjectModal = (project) => {
  const deleteProjectModalElement = deleteProjectModal(project);
  document.body.appendChild(deleteProjectModalElement);
};

const addNewTodoModal = () => {
  const newTodoModalElement = newTodoModal();
  document.body.appendChild(newTodoModalElement);
};

const addUpdateTodoModal = (todo) => {
  const updateTodoModalElement = updateTodoModal(todo);
  document.body.appendChild(updateTodoModalElement);
};

const addDeleteTodoModal = (todo) => {
  const deleteTodoModalElement = deleteTodoModal(todo);
  document.body.appendChild(deleteTodoModalElement);
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
  updateContent(projects, newProjectTitle);

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

const handleUpdateProject = (e, projects) => {
  const updateProjectModal = document.getElementById("update-project-modal");
  const oldProjectTitle = document.getElementById("project-title").textContent;
  const newProjectTitle = e.target.elements.title.value;
  console.log("Update project title:", newProjectTitle);
  projectService.renameProject(projects, oldProjectTitle, newProjectTitle);
  updateContent(projects, newProjectTitle);
  updateProjectModal.close();
};

const openUpdateProjectModal = (projects) => {
  const projectTitle = document.getElementById("project-title").textContent;

  if (projectTitle === "Inbox") {
    console.log("Cannot update Inbox project");
    return;
  }

  const findProject = projectService.getProjectByTitle(projects, projectTitle);
  addUpdateProjectModal(findProject);
  const updateProjectModal = document.getElementById("update-project-modal");
  const updateProjectForm = document.getElementById("update-project-form");
  updateProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUpdateProject(e, projects);
  });

  const cancelUpdateProjectButton = document.getElementById(
    "cancel-update-project-button"
  );

  cancelUpdateProjectButton.addEventListener("click", () => {
    console.log("Cancel update project button clicked");
    updateProjectModal.close();
  });
  updateProjectModal.showModal();
};

const handleDeleteProject = (projects, projectTitle) => {
  const deleteProjectModal = document.getElementById("delete-project-modal");
  console.log(projects);
  projects = projectService.removeProject(projects, projectTitle);
  console.log(projects);
  updateContent(projects, "Inbox");
  deleteProjectModal.close();
};

const openDeleteProjectModal = (projects) => {
  const projectTitle = document.getElementById("project-title").textContent;
  console.log("Try to delete project title:", projectTitle);

  if (["Inbox", "Today", "This week", "This month"].includes(projectTitle)) {
    console.log(`Cannot delete section: ${projectTitle}!`);
    return;
  }

  const findProject = projectService.getProjectByTitle(projects, projectTitle);

  if (findProject.getAllTodos().length > 0) {
    console.log("Cannot delete project with todos");
    return;
  }

  addDeleteProjectModal(findProject);

  const deleteProjectModal = document.getElementById("delete-project-modal");
  const deleteProjectForm = document.getElementById("delete-project-form");
  deleteProjectModal.showModal();

  const cancelDeleteProjectButton = document.getElementById(
    "cancel-delete-project-button"
  );

  cancelDeleteProjectButton.addEventListener("click", () => {
    console.log("Cancel delete project button clicked");
    deleteProjectModal.close();
  });

  deleteProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleDeleteProject(projects, projectTitle);
  });

  deleteProjectModal.showModal();
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

  const cancelUpdateTodoButton = document.getElementById(
    "cancel-update-todo-button"
  );

  cancelUpdateTodoButton.addEventListener("click", () => {
    console.log("Cancel update todo button clicked");
    updateTodoModal.close();
  });

  updateTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUpdateTodo(e, projects, findProject, todoId);
  });
  updateTodoModal.showModal();
};

const handleDeleteTodo = (e, projects, project, todoId) => {
  const deleteTodoModal = document.getElementById("delete-todo-modal");
  project.removeTodo(todoId);
  updateContent(projects, project.title);
  deleteTodoModal.close();
};

const openDeleteTodoModal = (projects) => {
  const projectTitle = document.getElementById("project-title").textContent;
  const findProject = projectService.getProjectByTitle(projects, projectTitle);
  const todoId = document.getElementById("todo-item").dataset.id;
  const findTodo = findProject.getTodo(todoId);

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
    handleDeleteTodo(e, projects, findProject, todoId);
  });
  deleteTodoModal.showModal();
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
  console.log(projects);
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
    "cancel-new-project-button"
  );

  const updateProjectButton = document.getElementById("update-project-button");
  const deleteProjectButton = document.getElementById("delete-project-button");

  const newTodoButton = document.getElementById("new-todo-button");
  const cancelNewTodoButton = document.getElementById("cancel-new-todo-button");

  const updateTodoButton = document.getElementById("update-todo-button");
  const deleteTodoButton = document.getElementById("delete-todo-button");

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

  updateProjectButton.addEventListener("click", () => {
    console.log("Update project button clicked");
    openUpdateProjectModal(projects);
  });

  deleteProjectButton.addEventListener("click", () => {
    console.log("Delete project button clicked");
    openDeleteProjectModal(projects);
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

  deleteTodoButton.addEventListener("click", () => {
    console.log("Delete todo button clicked");
    openDeleteTodoModal(projects);
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
