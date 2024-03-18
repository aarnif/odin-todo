import addProjectsMenu from "./projectsMenu.js";
import funcs from "./funcs.js";
import projectModal from "../projectModal.js";
import { endOfWeek, endOfMonth } from "date-fns";

const todosItem = (id, text) => {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.setAttribute("id", id);
  button.textContent = text;
  li.appendChild(button);
  return li;
};

const sideBar = () => {
  const sidebar = document.createElement("div");
  sidebar.setAttribute("id", "sidebar");

  const nav = document.createElement("nav");
  nav.setAttribute("id", "menu");

  const h1 = document.createElement("h1");
  h1.textContent = "Todo";
  nav.appendChild(h1);

  const todoList = document.createElement("ul");

  todoList.appendChild(todosItem("inbox", "Inbox"));
  todoList.appendChild(todosItem("today", "Today"));
  todoList.appendChild(todosItem("week", "This week"));
  todoList.appendChild(todosItem("month", "This month"));

  nav.appendChild(todoList);
  sidebar.appendChild(nav);

  return sidebar;
};

const addNewProjectModal = () => {
  const newProjectModalElement = projectModal();
  document.body.appendChild(newProjectModalElement);
};

export const removeSideBar = () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.remove();
};

const addSideBar = (projects) => {
  const wrapper = document.getElementById("wrapper");
  const sideBarElement = sideBar(projects);

  wrapper.appendChild(sideBarElement);

  addNewProjectModal();
  addProjectsMenu(projects);

  const inboxButton = document.getElementById("inbox");
  const todayButton = document.getElementById("today");
  const thisWeekButton = document.getElementById("week");
  const thisMonthButton = document.getElementById("month");

  inboxButton.addEventListener("click", (e) => {
    console.log("Inbox button clicked");
    funcs.displayProjectTodos(projects, e.target.textContent);
  });

  todayButton.addEventListener("click", (e) => {
    console.log("Today button clicked");
    funcs.displayTodosDueDate(projects, e.target.textContent, new Date());
  });

  thisWeekButton.addEventListener("click", (e) => {
    console.log("This week button clicked");
    funcs.displayTodosDueDate(
      projects,
      e.target.textContent,
      endOfWeek(new Date())
    );
  });

  thisMonthButton.addEventListener("click", (e) => {
    console.log("This month button clicked");
    funcs.displayTodosDueDate(
      projects,
      e.target.textContent,
      endOfMonth(new Date())
    );
  });
};

export default addSideBar;
