const ProjectsMenu = (projectTitles) => {
  const projectsList = document.createElement("ul");
  projectsList.id = "projects";

  const projectsListHeaderContainer = document.createElement("li");
  const projectsListHeader = document.createElement("h2");
  projectsListHeader.textContent = "Projects";

  projectsListHeaderContainer.appendChild(projectsListHeader);

  projectsList.appendChild(projectsListHeaderContainer);

  projectTitles.forEach((title) => {
    const project = document.createElement("li");
    project.textContent = title;
    projectsList.appendChild(project);
  });

  return projectsList;
};

export default ProjectsMenu;
