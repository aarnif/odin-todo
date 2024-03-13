import formButtons from "./formButtons.js";

const cancelButtonAttributes = {
  id: "cancel-delete-project-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-delete-project-button",
  type: "submit",
  textContent: "Delete Project",
};

const deleteProjectsForm = (project) => {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  form.id = "delete-project-form";

  const formHeader = document.createElement("h2");
  formHeader.textContent = `Delete ${project.title}?`;

  const formButtonElements = formButtons(
    cancelButtonAttributes,
    submitButtonAttributes
  );

  form.appendChild(formHeader);
  form.appendChild(formButtonElements);

  dialog.appendChild(form);

  return form;
};

const deleteProjectModal = (project) => {
  const dialog = document.createElement("dialog");
  dialog.id = "delete-project-modal";
  const form = deleteProjectsForm(project);

  dialog.appendChild(form);

  return dialog;
};

export default deleteProjectModal;
