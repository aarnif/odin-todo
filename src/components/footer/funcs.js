import todoModal from "../todoModal.js";
import projectService from "../../services/projectService.js";
import { Todo } from "../../projectsAndTodos/Todo.js";
import { v4 as uuid } from "uuid";
import { updateProjectsMenu, displayProjectTodos } from "../sideBar/funcs.js";

const handleAddNewTodo = (e, projects) => {
  const newTodoModal = document.getElementById("todo-modal");
  const projectTitle = document.getElementById("project-title").textContent;
  const findProject = projectService.getProjectByTitle(projects, projectTitle);

  const newTodo = new Todo(
    uuid(),
    e.target.elements.title.value,
    e.target.elements.description.value,
    e.target.elements.dueDate.value,
    e.target.elements.priority.value
  );

  const checkListItems = document.querySelectorAll("#check-list-item");

  checkListItems.forEach((item) => {
    const checkListItemName = item.querySelector("#new-check-list-item").value;
    const checkListItemChecked = item.querySelector("#completed").checked
      ? true
      : false;
    newTodo.addCheckListItem(uuid(), checkListItemName, checkListItemChecked);
  });

  console.log(newTodo);

  console.log("New todo title:", newTodo.title);

  findProject.addNewTodo(newTodo);
  updateProjectsMenu(projects);
  displayProjectTodos(projects, projectTitle);
  newTodoModal.close();
  document.body.removeChild(newTodoModal);
};

const addNewTodoModal = () => {
  const newTodoModalElement = todoModal();
  document.body.appendChild(newTodoModalElement);
};

const openNewTodoModal = (projects) => {
  console.log(projects);
  addNewTodoModal();
  const newTodoModal = document.getElementById("todo-modal");
  const newTodoForm = document.getElementById("todo-form");

  const cancelNewTodoButton = document.getElementById("cancel-todo-button");

  cancelNewTodoButton.addEventListener("click", () => {
    console.log("Cancel new todo button clicked");
    document.body.removeChild(newTodoModal);
    newTodoModal.close();
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddNewTodo(e, projects);
  });

  newTodoModal.showModal();
};

export default { openNewTodoModal };
