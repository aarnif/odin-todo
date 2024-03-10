import { v4 as uuidv4 } from "uuid";
import { formatISO, formatDistance } from "date-fns";

export class Todo {
  constructor(title, description, dueDate, priority = "Low") {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // "Low", "Medium" or "High"
    this.timeLeft = this.calculateTimeLeft();
    this.completed = false;
    this.checkList = [];
  }

  calculateTimeLeft() {
    return formatDistance(formatISO(new Date()), this.dueDate);
  }

  addCheckListItem(description) {
    const checkListItem = {
      id: uuidv4(),
      description: description,
      completed: false,
    };
    this.checkList.push(checkListItem);
  }

  removeCheckListItem(id) {
    this.checkList = this.checkList.filter((item) => item.id !== id);
  }

  changeCheckListItem(id, newDescription) {
    this.checkList.map((item) =>
      item.id === id ? { ...item, description: newDescription } : item
    );
  }
}
