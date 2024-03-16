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
  id: "cancel-new-checklist-item-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-new-checklist-item-button",
  type: "submit",
  textContent: "Add Item",
};

const newCheckListItemForm = () => {
  const form = document.createElement("form");

  form.id = "new-check-list-item-form";

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

const newCheckListItemModal = () => {
  const dialog = document.createElement("dialog");
  dialog.id = "new-check-list-item-modal";
  const form = newCheckListItemForm();

  dialog.appendChild(form);

  console.log(dialog);
  return dialog;
};

export default newCheckListItemModal;
