import checkListItems, { addNewCheckListItem } from "../checkListItems.js";
import formButtons from "../formComponents/formButtons.js";

const checkListItemsAttributes = {
  type: "text",
  id: "check-list-item",
  name: "check-list-item",
  value: "",
  placeholder: "description",
  label: `Checklist item`,
};

const cancelButtonAttributes = {
  id: "cancel-checklist-item-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-checklist-item-button",
  type: "submit",
  textContent: "Submit",
};

const checkListItemForm = () => {
  const form = document.createElement("form");

  form.id = "check-list-item-form";

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

const checkListItemModal = (checkListItem = null) => {
  // If updating a check list item
  if (checkListItem) {
    checkListItemsAttributes.value = checkListItem.description;
  }
  const dialog = document.createElement("dialog");

  // Disable, because will not remove the dialog from the DOM when pressing the escape key in Chrome
  dialog.addEventListener("cancel", (event) => event.preventDefault());

  dialog.id = "check-list-item-modal";
  const form = checkListItemForm();

  dialog.appendChild(form);

  return dialog;
};

export default checkListItemModal;
