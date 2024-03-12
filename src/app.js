import { projects } from "./data.js";
import displayService from "./services/displayService.js";

const loadPage = () => {
  displayService.loadContent(projects);
};

export default { loadPage };
