import { Project } from "../projectsAndTodos/Project.js";
import { v4 as uuid } from "uuid";

const getProjectTitles = (projects) => projects.map((project) => project.title);

const createNewProject = (projects, projectTitle) => {
  if (getProjectByTitle(projects, projectTitle)) {
    console.log(`Project named '${projectTitle}' already exists!`);
    return;
  }
  console.log(`Add new project: ${projectTitle}`);
  projects.push(new Project(uuid(), projectTitle));
  return projects;
};

const removeProject = (projects, projectTitle) => {
  console.log(`Remove project: ${projectTitle}`);
  return projects.filter((project) => project.title !== projectTitle);
};

const getProjectByTitle = (projects, projectTitle) =>
  projects.find((project) => project.title === projectTitle);

const getProjectById = (projects, id) =>
  projects.find((project) => project.id === id);

const renameProject = (projects, oldTitle, newTitle) =>
  projects.map((project) => {
    if (project.title === oldTitle) {
      project.title = newTitle;
    }
    return project;
  });

export default {
  getProjectTitles,
  createNewProject,
  removeProject,
  getProjectByTitle,
  getProjectById,
  renameProject,
};
