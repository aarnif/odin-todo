import "./styles.css";
import { projects } from "./data.js";
import { getProjectTitles } from "./utils/projectService.js";
import ProjectsMenu from "./components/ProjectsMenu.js";

const displayProjectTitles = () => {
  const menu = document.getElementById("menu");
  const projectsListItems = ProjectsMenu(getProjectTitles(projects));
  menu.appendChild(projectsListItems);
};

const loadContent = () => {
  displayProjectTitles();
};

loadContent();
