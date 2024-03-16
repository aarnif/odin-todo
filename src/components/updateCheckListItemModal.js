import checkListItems from "./checkListItems.js";
import formButtons from "./formComponents/formButtons.js";
import { addNewCheckListItem } from "./checkListItems.js";

const checkListItemsAttributes = {
  type: "text",
  id: "new-check-list-item",
  name: "new-check-list-item",
  value: "",
  placeholder: "Add checklist item",
  label: `Checklist item`,
};

const cancelButtonAttributes = {
  id: "cancel-update-checklist-item-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-update-checklist-item-button",
  type: "submit",
  textContent: "Update Item",
};

const updateCheckListItemForm = (checkListItem) => {
  const form = document.createElement("form");

  form.id = "new-check-list-item-form";

  checkListItemsAttributes.value = checkListItem.description;
  checkListItemsAttributes.completed = checkListItem.completed;

  const checkListItemsElement = checkListItems(checkListItemsAttributes);

  addNewCheckListItem(checkListItemsElement, checkListItemsAttributes);

  form.appendChild(checkListItemsElement);

  const formButtonElements = formButtons(
    cancelButtonAttributes,
    submitButtonAttributes
  );

  form.appendChild(formButtonElements);

  return form;
};

const updateCheckListItemModal = (checkListItem) => {
  const dialog = document.createElement("dialog");
  dialog.id = "update-check-list-item-modal";
  const form = updateCheckListItemForm(checkListItem);

  dialog.appendChild(form);

  console.log(dialog);
  return dialog;
};

export default updateCheckListItemModal;
