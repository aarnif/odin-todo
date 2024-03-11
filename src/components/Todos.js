const item = (key, value) => {
  const todoItem = document.createElement("li");
  todoItem.textContent = `${key}: ${value}`;
  return todoItem;
};

const checkListItem = (checkList) => {
  const { id, ...items } = checkList;
  const checkListItemList = document.createElement("ul");
  checkListItemList.id = id;
  for (const [key, value] of Object.entries(items)) {
    const checkListItem = document.createElement("li");
    checkListItem.textContent = `${key}: ${value}`;
    checkListItemList.appendChild(checkListItem);
  }
  return checkListItemList;
};

const checkList = (checkList) => {
  const todoCheckList = document.createElement("ul");
  checkList.forEach((item) => {
    const todoCheckListItemContainer = document.createElement("li");
    const todoCheckListItem = checkListItem(item);
    todoCheckListItemContainer.appendChild(todoCheckListItem);
    todoCheckList.appendChild(todoCheckListItemContainer);
  });
  return todoCheckList;
};

const Todo = (todo) => {
  const { id, title, ...items } = todo;
  const todoContainer = document.createElement("li");
  todoContainer.id = id;

  const todoHeader = document.createElement("h3");
  todoHeader.textContent = title;

  todoContainer.appendChild(todoHeader);

  const todoItemsList = document.createElement("ul");

  for (const [key, value] of Object.entries(items)) {
    if (key !== "checkList") {
      const todoItemListElement = item(key, value);
      todoItemsList.appendChild(todoItemListElement);
    } else {
      const todoCheckListElement = checkList(value);
      todoItemsList.appendChild(todoCheckListElement);
    }
  }

  todoContainer.appendChild(todoItemsList);

  return todoContainer;
};

const Todos = (title, todos) => {
  const todosList = document.createElement("ul");
  const todosListHeader = document.createElement("h2");
  todosListHeader.textContent = title;

  todosList.appendChild(todosListHeader);
  todos.forEach((todo) => {
    const todoItemElement = Todo(todo);
    todosList.appendChild(todoItemElement);
  });

  return todosList;
};

export default Todos;
