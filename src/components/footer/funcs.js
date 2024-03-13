import newTodoModal from "../newTodoModal.js";
import projectService from "../../services/projectService.js";
import { Todo } from "../../projectsAndTodos/Todo.js";
import { v4 as uuid } from "uuid";
import { updateProjectsMenu, displayProjectTodos } from "../sideBar/funcs.js";

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

  const checkListItems = document.querySelectorAll("#new-checkListItem");

  console.log(checkListItems);

  checkListItems.forEach((item) => {
    newTodo.addCheckListItem(uuid(), item.value);
  });

  console.log("New todo title:", newTodo.title);

  findProject.addNewTodo(newTodo);
  updateProjectsMenu(projects);
  displayProjectTodos(projects, projectTitle);
  newTodoModal.close();
  document.body.removeChild(newTodoModal);
};

const addNewTodoModal = () => {
  const newTodoModalElement = newTodoModal();
  document.body.appendChild(newTodoModalElement);
};

const openNewTodoModal = (projects) => {
  console.log(projects);
  addNewTodoModal();
  const newTodoModal = document.getElementById("new-todo-modal");
  const newTodoForm = document.getElementById("new-todo-form");
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddNewTodo(e, projects);
  });

  const cancelNewTodoButton = document.getElementById("cancel-new-todo-button");

  cancelNewTodoButton.addEventListener("click", () => {
    console.log("Cancel new todo button clicked");
    newTodoModal.close();
  });
  newTodoModal.showModal();
};

export default { openNewTodoModal };
