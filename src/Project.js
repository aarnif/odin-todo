import { v4 as uuidv4 } from "uuid";

export class Project {
  constructor(title) {
    this.id = uuidv4();
    this._title = title;
    this.todos = [];
  }

  set title(newTitle) {
    if (!newTitle.length) {
      return;
    }
    this._title = newTitle;
  }

  get title() {
    return this._title;
  }

  getAllTodos() {
    return this.todos;
  }

  getTodo(title) {
    return this.todos.find((todo) => title === todo.title);
  }

  addNewTodo(newTodo) {
    if (this.getTodo(newTodo.title)) {
      return;
    }
    this.todos.push(newTodo);
  }

  removeTodo(title) {
    this.todos = this.todos.filter((todo) => todo.title != title);
  }
}
