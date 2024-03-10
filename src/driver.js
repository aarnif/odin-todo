import { formatISO, addDays } from "date-fns";
import { Todo } from "./Todo.js";
import { Project } from "./Project.js";

console.log("Testing Todo class:");
const todo = new Todo(
  "Learn JavaScript",
  "Complete JavaScript tutorials",
  formatISO(addDays(new Date(), 10)),
  "High"
);
console.log("Initial Todo:", todo);

console.log("Time Left:", todo.calculateTimeLeft());

todo.addCheckListItem("Complete lesson 1");
todo.addCheckListItem("Complete lesson 2");
console.log("After adding checklist items:", todo.checkList);

const itemToRemove = todo.checkList[0].id;
todo.removeCheckListItem(itemToRemove);
console.log("After removing a checklist item:", todo.checkList);

const itemToChange = todo.checkList[0].id;
todo.changeCheckListItem(itemToChange, "Complete lesson 3");
console.log("After changing a checklist item:", todo.checkList);

console.log("\nTesting Project class:");
const project = new Project("Web Development");
console.log("Initial Project:", project);

project.addNewTodo(todo);
console.log("After adding new todo:", project.getAllTodos());

const fetchedTodo = project.getTodo(todo.id);
console.log("Fetched Todo:", fetchedTodo);

const updatedTodo = new Todo(
  "Learn React",
  "Complete React tutorials",
  formatISO(addDays(new Date(), 20)),
  "Medium"
);
project.updateTodo(todo.id, updatedTodo);
console.log("After updating todo:", project.getAllTodos());

project.removeTodo(updatedTodo.title);
console.log("After removing todo:", project.getAllTodos());
