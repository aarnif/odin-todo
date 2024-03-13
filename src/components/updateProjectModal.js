import formRow from "./formComponents/formRow.js";
import formButtons from "./formComponents/formButtons.js";

const titleAttributes = {
  type: "text",
  id: "title",
  name: "title",
  value: "",
  placeholder: "Title",
  required: true,
};

const cancelButtonAttributes = {
  id: "cancel-update-project-button",
  type: "button",
  formMethod: "dialog",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-update-project-button",
  type: "submit",
  textContent: "Update Project",
};

const updateProjectForm = (project) => {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  form.id = "update-project-form";

  titleAttributes.value = project.title;

  const allInputAttributes = [titleAttributes];

  allInputAttributes.forEach((input) => {
    const formRowElement = formRow(input.id, input);
    form.appendChild(formRowElement);
  });

  const formButtonElements = formButtons(
    cancelButtonAttributes,
    submitButtonAttributes
  );

  form.appendChild(formButtonElements);

  dialog.appendChild(form);

  return form;
};

const updateProjectModal = (project) => {
  const dialog = document.createElement("dialog");
  dialog.id = "update-project-modal";

  const form = updateProjectForm(project);

  dialog.appendChild(form);

  return dialog;
};

export default updateProjectModal;
