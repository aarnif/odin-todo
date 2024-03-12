import { Project } from "./projectsAndTodos/Project.js";
import { Todo } from "./projectsAndTodos/Todo.js";
import { v4 as uuid } from "uuid";

const inbox = new Project(uuid(), "Inbox");
const school = new Project(uuid(), "School");
const houseChores = new Project(uuid(), "HouseChores");
const hobbies = new Project(uuid(), "Hobbies");

const mathHomework = new Todo(
  uuid(),
  "Math Homework",
  "Complete algebra problems",
  "2024-03-15",
  "High"
);

const scienceProject = new Todo(
  uuid(),
  "Science Project",
  "Work on science fair project",
  "2024-04-01",
  "Medium"
);

const cleanRoom = new Todo(
  uuid(),
  "Clean Room",
  "Vacuum and dust the room",
  "2024-03-20",
  "Medium"
);

const groceryShopping = new Todo(
  uuid(),
  "Grocery Shopping",
  "Buy groceries for the week",
  "2024-03-12",
  "High"
);

const readBook = new Todo(
  uuid(),
  "Read Book",
  "Finish reading 'The Great Gatsby'",
  "2024-03-25",
  "Low"
);

const gardening = new Todo(
  uuid(),
  "Gardening",
  "Plant new flowers in the garden",
  "2024-03-30",
  "Medium"
);

mathHomework.addCheckListItem(uuid(), "Solve equations");
mathHomework.addCheckListItem(uuid(), "Check answers");

scienceProject.addCheckListItem(uuid(), "Gather materials");
scienceProject.addCheckListItem(uuid(), "Conduct experiments");

cleanRoom.addCheckListItem(uuid(), "Dust shelves");
cleanRoom.addCheckListItem(uuid(), "Vacuum floor");

groceryShopping.addCheckListItem(uuid(), "List items");
groceryShopping.addCheckListItem(uuid(), "Go to store");

readBook.addCheckListItem(uuid(), "Read chapters 1-3");
readBook.addCheckListItem(uuid(), "Take notes");

gardening.addCheckListItem(uuid(), "Prepare soil");
gardening.addCheckListItem(uuid(), "Plant seeds");

school.addNewTodo(mathHomework);
school.addNewTodo(scienceProject);

houseChores.addNewTodo(cleanRoom);
houseChores.addNewTodo(groceryShopping);

hobbies.addNewTodo(readBook);
hobbies.addNewTodo(gardening);

export const projects = [inbox, school, houseChores, hobbies];
