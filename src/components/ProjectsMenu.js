const ProjectsMenu = (projectTitles) => {
  const projectsList = document.createElement("ul");
  projectsList.id = "projects";

  const projectsListHeaderContainer = document.createElement("li");
  const projectsListHeader = document.createElement("h2");
  projectsListHeader.textContent = "Projects";

  projectsListHeaderContainer.appendChild(projectsListHeader);

  projectsList.appendChild(projectsListHeaderContainer);

  projectTitles.forEach((title) => {
    const projectTitleContainer = document.createElement("li");
    const projectTitleButton = document.createElement("button");
    projectTitleButton.setAttribute("id", "project-button");
    projectTitleButton.textContent = title;

    projectTitleContainer.appendChild(projectTitleButton);
    projectsList.appendChild(projectTitleContainer);
  });

  return projectsList;
};

export default ProjectsMenu;
