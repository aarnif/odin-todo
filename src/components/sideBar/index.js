import addProjectsMenu from "./projectsMenu.js";
import funcs from "./funcs.js";
import projectModal from "../modals/project.js";
import { endOfWeek, endOfMonth } from "date-fns";
import inboxIcon from "../icons/inbox.js";
import todayIcon from "../icons/today.js";
import weekIcon from "../icons/week.js";
import monthIcon from "../icons/month.js";

const todosItem = (id, icon, text) => {
  const li = document.createElement("li");
  li.className = "w-full flex-row-justify-start-items-center my-2";

  li.appendChild(icon());

  const button = document.createElement("button");
  button.id = id;
  button.className = "header2";
  button.textContent = text;
  li.appendChild(button);
  return li;
};

const blankRow = () => {
  const li = document.createElement("li");
  li.className = "w-full flex-row-justify-start-items-center h-4";
  return li;
};

const sideBar = () => {
  const sidebar = document.createElement("div");
  sidebar.id = "sidebar";
  sidebar.className = "sidebar";

  const nav = document.createElement("nav");
  nav.id = "menu";

  const todoList = document.createElement("ul");
  todoList.className = "flex-col-center";

  const sideBarHeaderContainer = document.createElement("li");
  const sideBarHeader = document.createElement("h1");
  sideBarHeader.className = "header1";
  sideBarHeader.textContent = "Todo";

  sideBarHeaderContainer.appendChild(sideBarHeader);
  todoList.appendChild(sideBarHeaderContainer);

  todoList.appendChild(blankRow());
  todoList.appendChild(todosItem("inbox", inboxIcon, "Inbox"));
  todoList.appendChild(blankRow());
  todoList.appendChild(todosItem("today", todayIcon, "Today"));
  todoList.appendChild(todosItem("week", weekIcon, "This week"));
  todoList.appendChild(todosItem("month", monthIcon, "This month"));

  nav.appendChild(todoList);
  sidebar.appendChild(nav);

  return sidebar;
};

// const addNewProjectModal = () => {
//   const newProjectModalElement = projectModal();
//   document.body.appendChild(newProjectModalElement);
// };

export const removeSideBar = () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.remove();
};

const addSideBar = (projects) => {
  const wrapper = document.getElementById("wrapper");
  const sideBarElement = sideBar(projects);

  wrapper.appendChild(sideBarElement);

  // addNewProjectModal();
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
