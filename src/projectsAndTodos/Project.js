export class Project {
  constructor(id, title) {
    this.id = id;
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

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
  }
}
