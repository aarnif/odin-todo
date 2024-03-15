import formRow from "./formComponents/formRow.js";
import checkListItems from "./checkListItems.js";
import formButtons from "./formComponents/formButtons.js";
import { addNewCheckListItem } from "./checkListItems.js";

const titleAttributes = {
  type: "text",
  id: "title",
  name: "title",
  value: "",
  placeholder: "Title",
  required: true,
};

const descriptionAttributes = {
  type: "text",
  id: "description",
  name: "description",
  value: "",
  placeholder: "Description",
};

const dueDateAttributes = {
  type: "date",
  id: "dueDate",
  name: "dueDate",
  value: "",
  placeholder: "Due date",
  required: true,
};

const priorityAttributes = {
  id: "priority",
  values: ["Low", "Medium", "High"],
  required: true,
};

const checkListItemsAttributes = {
  type: "text",
  id: "update-check-list-item",
  name: "update-check-list-item",
  value: "",
  placeholder: "Add checklist item",
  label: `Checklist item`,
  completed: false,
};

const cancelButtonAttributes = {
  id: "cancel-update-todo-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-update-todo-button",
  type: "submit",
  textContent: "Update Todo",
};

const UpdateTodoForm = (todo) => {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  form.id = "update-todo-form";

  titleAttributes.value = todo.title;
  descriptionAttributes.value = todo.description;
  dueDateAttributes.value = todo.dueDate;
  priorityAttributes.defaultValue = todo.priority;

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

  const checkListItemsElement = checkListItems();

  form.appendChild(checkListItemsElement);

  todo.checkList.forEach((item) => {
    const itemAttributes = {
      type: "text",
      id: "update-check-list-item",
      name: "update-check-list-item",
      value: item.description,
      placeholder: "Add checklist item",
      label: `Checklist item`,
      completed: item.completed,
    };
    addNewCheckListItem(checkListItemsElement, itemAttributes);
  });

  const newCheckListButton = document.createElement("button");
  newCheckListButton.id = "new-check-list-button";
  newCheckListButton.textContent = "New CheckList Item";

  newCheckListButton.addEventListener("click", (e) => {
    e.preventDefault();
    addNewCheckListItem(checkListItemsElement, checkListItemsAttributes);
  });

  form.appendChild(newCheckListButton);

  const formButtonElements = formButtons(
    cancelButtonAttributes,
    submitButtonAttributes
  );

  form.appendChild(formButtonElements);

  dialog.appendChild(form);

  return form;
};

const updateTodoModal = (todo) => {
  const dialog = document.createElement("dialog");
  dialog.id = "update-todo-modal";
  const form = UpdateTodoForm(todo);

  dialog.appendChild(form);

  console.log(dialog);
  return dialog;
};

export default updateTodoModal;
