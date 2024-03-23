import funcs from "./funcs.js";
import updateIcon from "../icons/update.js";
import deleteIcon from "../icons/delete.js";
import plusIcon from "../icons/plus.js";

const checkListItemContent = (projects, todoId, checkList) => {
  const { id, ...items } = checkList;
  const checkListItemContentList = document.createElement("ul");
  checkListItemContentList.id = id;
  checkListItemContentList.className = "check-list-item-content";

  const markCompletedContainer = document.createElement("li");
  const markCompletedCheckbox = document.createElement("input");
  markCompletedCheckbox.type = "checkbox";
  markCompletedCheckbox.checked = items.completed;

  markCompletedCheckbox.addEventListener("change", () => {
    console.log("Mark checklist item completed checkbox clicked");
    funcs.markCheckListItemCompleted(projects, todoId, checkList, id);
  });

  markCompletedContainer.appendChild(markCompletedCheckbox);

  const checkListItemDescription = document.createElement("li");
  checkListItemDescription.textContent = items.description;

  if (items.completed) {
    checkListItemDescription.style.textDecoration = "line-through";
  }

  checkListItemContentList.appendChild(markCompletedContainer);
  checkListItemContentList.appendChild(checkListItemDescription);

  const checkListButtonsContainer = document.createElement("li");
  checkListButtonsContainer.className = "min-w-[100px]";

  const updateCheckListItemButton = document.createElement("button");
  updateCheckListItemButton.id = id;
  updateCheckListItemButton.className = "update-check-list-item-button pr-1";

  const updateCheckListItemIcon = updateIcon();

  updateCheckListItemIcon.addEventListener("click", () => {
    console.log("Update check list item button clicked");
    funcs.openUpdateCheckListItemModal(projects, todoId, checkList, id);
  });

  updateCheckListItemButton.appendChild(updateCheckListItemIcon);
  checkListButtonsContainer.appendChild(updateCheckListItemButton);

  const deleteCheckListItemButton = document.createElement("button");
  deleteCheckListItemButton.id = id;
  deleteCheckListItemButton.className = "delete-check-list-item-button";

  const deleteCheckListItemIcon = deleteIcon();

  deleteCheckListItemIcon.addEventListener("click", () => {
    console.log("Delete check list item button clicked");
    funcs.openDeleteCheckListItemModal(projects, todoId, checkList, id);
  });

  deleteCheckListItemButton.appendChild(deleteCheckListItemIcon);
  checkListButtonsContainer.appendChild(deleteCheckListItemButton);
  checkListItemContentList.appendChild(checkListButtonsContainer);

  return checkListItemContentList;
};

const checkListItem = (projects, todoId, checkList) => {
  const checkListItemContentElement = checkListItemContent(
    projects,
    todoId,
    checkList
  );

  return checkListItemContentElement;
};

const checkList = (projects, todoId, checkList) => {
  const todoCheckList = document.createElement("ul");
  todoCheckList.id = todoId;
  todoCheckList.className = "check-list-items";
  checkList.forEach((item) => {
    const todoCheckListItemContainer = document.createElement("li");
    const todoCheckListItem = checkListItem(projects, todoId, item);
    todoCheckListItemContainer.appendChild(todoCheckListItem);
    todoCheckList.appendChild(todoCheckListItemContainer);
  });
  return todoCheckList;
};

const addCheckListToTodoItem = (projects, todoId, todoItem, todoCheckList) => {
  const checkListHeader = document.createElement("h3");
  checkListHeader.id = "check-list-title";
  checkListHeader.className = "check-list-header";
  checkListHeader.textContent = "Check List";
  const todoCheckListElement = checkList(projects, todoId, todoCheckList);

  const newCheckListItemButton = document.createElement("button");
  newCheckListItemButton.id = todoId;
  newCheckListItemButton.className = "new-check-list-item-button";

  const newCheckListItemButtonIcon = plusIcon();
  newCheckListItemButton.appendChild(newCheckListItemButtonIcon);

  const newCheckListItemButtonText = document.createElement("span");
  newCheckListItemButtonText.textContent = "New Check List Item";

  newCheckListItemButton.appendChild(newCheckListItemButtonText);

  newCheckListItemButton.addEventListener("click", () => {
    console.log("New check list item button clicked");
    funcs.openNewCheckListItemModal(projects, todoId);
  });

  todoCheckListElement.appendChild(newCheckListItemButton);

  todoItem.appendChild(checkListHeader);
  todoItem.appendChild(todoCheckListElement);
};

export default addCheckListToTodoItem;
