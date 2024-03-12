import { format, isWithinInterval } from "date-fns";

const sortTodos = (todos, key) => {
  return todos.sort((a, b) => (a[key] <= b[key] ? -1 : 1));
};

const getAllTodos = (projects) => {
  let allTodos = [];
  projects.forEach((project) => {
    allTodos = [...allTodos, ...project.getAllTodos()];
  });
  return sortTodos(allTodos, "dueDate");
};

const getTodosDueBy = (projects, dueDate) => {
  console.log(`Todos due: ${format(dueDate, "yyyy-MM-dd")}`);
  const allToDos = getAllTodos(projects);

  const todosDueBy = allToDos.filter((todo) =>
    isWithinInterval(todo.dueDate, {
      start: new Date(),
      end: dueDate,
    })
  );

  return sortTodos(todosDueBy, "dueDate");
};

export default { getAllTodos, getTodosDueBy };
