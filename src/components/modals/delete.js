import formButtons from "../formComponents/formButtons.js";

const cancelButtonAttributes = {
  id: "cancel-delete-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-delete-button",
  type: "submit",
  textContent: "Submit",
};

const deleteForm = (deleteFormText) => {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  form.id = "delete-form";

  const formHeader = document.createElement("h2");
  formHeader.className = "w-full header2 mb-4 text-center";
  formHeader.textContent = deleteFormText;

  const formButtonElements = formButtons(
    cancelButtonAttributes,
    submitButtonAttributes
  );

  form.appendChild(formHeader);
  form.appendChild(formButtonElements);

  dialog.appendChild(form);

  return form;
};

const deleteModal = (deleteModalText) => {
  const dialog = document.createElement("dialog");
  dialog.id = "delete-modal";

  // Disable, because will not remove the dialog from the DOM when pressing the escape key in Chrome
  dialog.addEventListener("cancel", (event) => event.preventDefault());

  const form = deleteForm(deleteModalText);

  dialog.appendChild(form);

  return dialog;
};

export default deleteModal;
