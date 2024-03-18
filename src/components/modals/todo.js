import formRow from "../formComponents/formRow.js";
import formButtons from "../formComponents/formButtons.js";

const titleAttributes = {
  type: "text",
  id: "title",
  name: "title",
  value: "Test",
  placeholder: "Title",
  required: true,
};

const descriptionAttributes = {
  type: "text",
  id: "description",
  name: "description",
  value: "Test Todo description",
  placeholder: "Description",
};

const dueDateAttributes = {
  type: "date",
  id: "dueDate",
  name: "dueDate",
  value: "2024-04-01",
  placeholder: "Due date",
  required: true,
};

const priorityAttributes = {
  id: "priority",
  values: ["Low", "Medium", "High"],
  value: "Low",
  required: true,
};

const cancelButtonAttributes = {
  id: "cancel-todo-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-todo-button",
  type: "submit",
  textContent: "Submit",
};

const todoForm = () => {
  const form = document.createElement("form");

  form.id = "todo-form";

  const allInputAttributes = [
    titleAttributes,
    descriptionAttributes,
    dueDateAttributes,
    priorityAttributes,
  ];

  allInputAttributes.forEach((input) => {
    const formRowElement = formRow(input.id, input);
    form.appendChild(formRowElement);
  });

  const formButtonElements = formButtons(
    cancelButtonAttributes,
    submitButtonAttributes
  );

  form.appendChild(formButtonElements);

  return form;
};

const todoModal = (todo = null) => {
  // If updating a todo
  if (todo) {
    titleAttributes.value = todo.title;
    descriptionAttributes.value = todo.description;
    dueDateAttributes.value = todo.dueDate;
    priorityAttributes.defaultValue = todo.priority;
  }
  const dialog = document.createElement("dialog");
  dialog.id = "todo-modal";

  // Disable, because will not remove the dialog from the DOM when pressing the escape key in Chrome
  dialog.addEventListener("cancel", (event) => event.preventDefault());

  const form = todoForm();

  dialog.appendChild(form);

  console.log(dialog);
  return dialog;
};

export default todoModal;
