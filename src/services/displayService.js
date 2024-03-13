import addFooter from "../components/footer/index.js";
import addSideBar from "../components/sideBar/index.js";
import addContent from "../components/content.js";
import { displayProjectTodos } from "../components/sideBar/funcs.js";

const loadContent = (projects) => {
  addSideBar(projects);
  addContent();
  addFooter(projects);
  displayProjectTodos(projects, "Inbox");
};

export default {
  loadContent,
};
