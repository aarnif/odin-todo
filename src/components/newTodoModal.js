import formRow from "./formComponents/formRow.js";
import checkListItems from "./checkListItems.js";
import formButtons from "./formComponents/formButtons.js";

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

const checkListItemsAttributes = {
  type: "text",
  id: "new-checkListItem",
  name: "new-checkListItem",
  value: "Checklist item 1",
  placeholder: "Add checklist item",
};

const cancelButtonAttributes = {
  id: "cancel-new-todo-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-new-todo-button",
  type: "submit",
  textContent: "Add Todo",
};

const NewTodoForm = () => {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  form.id = "new-todo-form";

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

  const checkListItemsElement = checkListItems(
    checkListItemsAttributes.id,
    checkListItemsAttributes
  );

  form.appendChild(checkListItemsElement);

  const formButtonElements = formButtons(
    cancelButtonAttributes,
    submitButtonAttributes
  );

  form.appendChild(formButtonElements);

  dialog.appendChild(form);

  return form;
};

const newTodoModal = () => {
  const dialog = document.createElement("dialog");
  dialog.id = "new-todo-modal";
  const form = NewTodoForm();

  dialog.appendChild(form);

  console.log(dialog);
  return dialog;
};

export default newTodoModal;
