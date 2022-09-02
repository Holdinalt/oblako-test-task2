export class TodoModel{
  // id: number;
  // text: string;
  // is_completed: boolean;
  // category: CategoryModel;

  constructor(public id: number, public text: string, public isCompleted = false) {
  }

  toggle(): void{
    this.isCompleted = !this.isCompleted
  }
}
