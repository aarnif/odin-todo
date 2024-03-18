import { formatISO, formatDistance } from "date-fns";

export class Todo {
  constructor(
    id,
    title,
    description,
    dueDate,
    priority = "Low",
    completed = false
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // "Low", "Medium" or "High"
    this.timeLeft = this.calculateTimeLeft();
    this.completed = completed;
    this.checkList = [];
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  calculateTimeLeft() {
    return formatDistance(formatISO(new Date()), this.dueDate);
  }

  getAllCheckListItems() {
    return this.checkList.filter((item) => item.completed === false);
  }

  addCheckListItem(id, description, completed = false) {
    const checkListItem = {
      id: id,
      description: description,
      completed: completed,
    };
    this.checkList.push(checkListItem);
  }

  markCheckListItemCompleted(id) {
    this.checkList = this.checkList.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
  }

  removeCheckListItem(id) {
    this.checkList = this.checkList.filter((item) => item.id !== id);
  }

  updateCheckListItem(id, updatedCheckListItemContents) {
    this.checkList = this.checkList.map((item) =>
      item.id === id
        ? {
            ...item,
            description: updatedCheckListItemContents.description,
            completed: updatedCheckListItemContents.completed,
          }
        : item
    );
  }
}
