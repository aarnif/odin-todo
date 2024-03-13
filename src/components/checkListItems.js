const checkListItem = (label, attributes) => {
  const checkListItem = document.createElement("ul");
  checkListItem.id = "check-list-item";

  const formRowLabelItem = document.createElement("li");
  const formRowInputItem = document.createElement("li");
  const removeButtonItem = document.createElement("li");
  const formLabel = document.createElement("label");
  const formInput = document.createElement("input");
  const removeButton = document.createElement("button");

  formLabel.for = label;
  formLabel.textContent = label;

  Object.assign(formInput, attributes);

  removeButton.textContent = "Remove";

  formRowLabelItem.appendChild(formLabel);
  formRowInputItem.appendChild(formInput);
  removeButtonItem.appendChild(removeButton);

  checkListItem.appendChild(formRowLabelItem);
  checkListItem.appendChild(formRowInputItem);
  checkListItem.appendChild(removeButtonItem);

  return checkListItem;
};

const checkListItems = (label, attributes) => {
  const checkListItems = document.createElement("ul");
  checkListItems.id = "check-list-items";

  const checkListItemElement = checkListItem(label, attributes);

  checkListItems.appendChild(checkListItemElement);
  console.log(checkListItems);

  return checkListItems;
};

export default checkListItems;
