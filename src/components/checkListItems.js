const checkListItem = (attributes) => {
  const checkListItemForm = document.createElement("form");
  checkListItemForm.id = "check-list-item-form";
  const checkListItem = document.createElement("ul");
  checkListItem.id = "check-list-item";

  const formRowLabelItem = document.createElement("li");
  const formRowInputItem = document.createElement("li");
  const completedItem = document.createElement("li");
  completedItem.textContent = "Completed: ";
  const removeButtonItem = document.createElement("li");
  const formLabel = document.createElement("label");
  const formInput = document.createElement("input");
  const removeButton = document.createElement("button");

  formLabel.for = "check-list-item";
  formLabel.textContent = attributes.label;

  Object.assign(formInput, attributes);

  const completedCheckbox = document.createElement("input");
  completedCheckbox.type = "checkbox";
  completedCheckbox.id = "completed";
  completedCheckbox.name = "completed";
  completedCheckbox.value = true;
  completedCheckbox.label = "Completed";
  completedCheckbox.checked = attributes.completed;

  completedItem.appendChild(completedCheckbox);

  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkListItem.remove();
  });

  formRowLabelItem.appendChild(formLabel);
  formRowInputItem.appendChild(formInput);
  formRowInputItem.appendChild(completedItem);
  removeButtonItem.appendChild(removeButton);

  checkListItem.appendChild(formRowLabelItem);
  checkListItem.appendChild(formRowInputItem);
  checkListItem.appendChild(completedItem);
  checkListItem.appendChild(removeButtonItem);

  checkListItemForm.appendChild(checkListItem);

  return checkListItemForm;
};

export const addNewCheckListItem = (checkListItems, attributes) => {
  const newCheckListItemElement = checkListItem(attributes);
  checkListItems.appendChild(newCheckListItemElement);
};

const checkListItems = () => {
  const checkListItems = document.createElement("ul");
  checkListItems.id = "check-list-items";

  const checkListItemsHeader = document.createElement("h3");
  checkListItemsHeader.textContent = "Checklist:";

  checkListItems.appendChild(checkListItemsHeader);

  return checkListItems;
};

export default checkListItems;
