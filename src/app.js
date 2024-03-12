import { projects } from "./data.js";
import displayService from "./services/displayService.js";
import { endOfWeek, endOfMonth } from "date-fns";

const addEventListeners = () => {
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
  const cancelNewTodoButton = document.getElementById("cancel-todo-button");

  inboxButton.addEventListener("click", (e) => {
    console.log("Inbox button clicked");
    displayService.displayProjectTodos(projects, e.target.textContent);
  });

  todayButton.addEventListener("click", (e) => {
    console.log("Today button clicked");
    displayService.displayTodosDueDate(
      projects,
      e.target.textContent,
      new Date()
    );
  });

  thisWeekButton.addEventListener("click", (e) => {
    console.log("This week button clicked");
    displayService.displayTodosDueDate(
      projects,
      e.target.textContent,
      endOfWeek(new Date())
    );
  });

  thisMonthButton.addEventListener("click", (e) => {
    console.log("This month button clicked");
    displayService.displayTodosDueDate(
      projects,
      e.target.textContent,
      endOfMonth(new Date())
    );
  });

  projectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Project button clicked:", e.target.textContent);
      displayService.displayProjectTodos(projects, e.target.textContent);
    });
  });

  todoButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Todo button clicked:", e.target.textContent);
      displayService.displayTodo(projects, e.target.id);
    });
  });

  newProjectButton.addEventListener("click", () => {
    console.log("New project button clicked");
    displayService.openNewProjectModal(projects);
  });

  cancelNewProjectButton.addEventListener("click", () => {
    console.log("Cancel new project button clicked");
    newProjectModal.close();
  });

  newTodoButton.addEventListener("click", () => {
    console.log("New todo button clicked");
    displayService.openNewTodoModal(projects);
  });

  cancelNewTodoButton.addEventListener("click", () => {
    console.log("Cancel new todo button clicked");
    newTodoModal.close();
  });
};

const loadPage = () => {
  displayService.loadContent(projects);
  addEventListeners();
};

export default { loadPage };
