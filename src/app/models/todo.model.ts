export class TodoModel{
  // id: number;
  // text: string;
  // is_completed: boolean;
  // category: CategoryModel;

  constructor(public id: number, public text: string, public is_completed = false) {
  }

  toggle(): void{
    this.is_completed = !this.is_completed
  }
}
