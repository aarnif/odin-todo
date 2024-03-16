import formButtons from "./formComponents/formButtons.js";

const cancelButtonAttributes = {
  id: "cancel-delete-checklist-item-button",
  type: "button",
  textContent: "Cancel",
};

const submitButtonAttributes = {
  id: "submit-delete-checklist-item-button",
  type: "submit",
  textContent: "Delete Item",
};

const deleteCheckListItemForm = (checkListItem) => {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  form.id = "delete-checklist-item-form";

  const formHeader = document.createElement("h2");
  formHeader.textContent = `Delete item: ${checkListItem.description}?`;

  const formButtonElements = formButtons(
    cancelButtonAttributes,
    submitButtonAttributes
  );

  form.appendChild(formHeader);
  form.appendChild(formButtonElements);

  dialog.appendChild(form);

  return form;
};

const deleteCheckListItemModal = (checkListItem) => {
  const dialog = document.createElement("dialog");
  dialog.id = "delete-checklist-item-modal";
  const form = deleteCheckListItemForm(checkListItem);

  dialog.appendChild(form);

  return dialog;
};

export default deleteCheckListItemModal;
