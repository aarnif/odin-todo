import formButtons from "./formComponents/formButtons.js";

const cancelButtonAttributes = {
  id: "cancel-delete-todo-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-delete-todo-button",
  type: "submit",
  textContent: "Delete Todo",
};

const deleteTodoForm = (todo) => {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  form.id = "delete-todo-form";

  const formHeader = document.createElement("h2");
  formHeader.textContent = `Delete ${todo.title}?`;

  const formButtonElements = formButtons(
    cancelButtonAttributes,
    submitButtonAttributes
  );

  form.appendChild(formHeader);
  form.appendChild(formButtonElements);

  dialog.appendChild(form);

  return form;
};

const deleteTodoModal = (todo) => {
  const dialog = document.createElement("dialog");
  dialog.id = "delete-todo-modal";
  const form = deleteTodoForm(todo);

  dialog.appendChild(form);

  return dialog;
};

export default deleteTodoModal;
