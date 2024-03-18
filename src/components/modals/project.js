import formRow from "../formComponents/formRow.js";
import formButtons from "../formComponents/formButtons.js";

const titleAttributes = {
  type: "text",
  id: "title",
  name: "title",
  value: "",
  placeholder: "Title",
  required: true,
};

const cancelButtonAttributes = {
  id: "cancel-project-button",
  type: "button",
  formMethod: "dialog",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-project-button",
  type: "submit",
  textContent: "Submit",
};

const projectForm = () => {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  form.id = "project-form";

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

const projectModal = (project) => {
  // If updating a project
  if (project) {
    titleAttributes.value = project.title;
  }
  const dialog = document.createElement("dialog");
  dialog.id = "project-modal";

  // Disable, because will not remove the dialog from the DOM when pressing the escape key in Chrome
  dialog.addEventListener("cancel", (event) => event.preventDefault());

  const form = projectForm();

  dialog.appendChild(form);

  return dialog;
};

export default projectModal;
