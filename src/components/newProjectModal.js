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
  id: "cancel-new-project-button",
  type: "button",
  formMethod: "dialog",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-new-project-button",
  type: "submit",
  textContent: "Add Project",
};

const newProjectForm = () => {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  form.id = "new-project-form";

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

const newProjectModal = () => {
  const dialog = document.createElement("dialog");
  dialog.id = "new-project-modal";

  const form = newProjectForm();

  dialog.appendChild(form);

  return dialog;
};

export default newProjectModal;
