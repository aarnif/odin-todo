import { v4 as uuidv4 } from "uuid";

export class Project {
  constructor(title) {
    this.id = uuidv4();
    this._title = title;
    this.todos = [];
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get title() {
    return this._title;
  }

  getAllTodos() {
    return this.todos;
  }

  getTodo(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  addNewTodo(newTodo) {
    if (this.getTodo(newTodo.title)) {
      return;
    }
    this.todos.push(newTodo);
  }

  updateTodo(id, updatedTodo) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );
  }

  removeTodo(title) {
    this.todos = this.todos.filter((todo) => todo.title != title);
  }
}
