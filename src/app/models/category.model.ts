import {TodoModel} from "./todo.model";

export class CategoryModel{
  // id: number
  // title: string;

  constructor(public id: number, public title: string, public todos: TodoModel[]) {
  }

  addTodo(todo: TodoModel): void{
    this.todos.push(todo)
  }
}
