import {Component, Inject, OnInit} from '@angular/core';
import {CategoryModel} from "./models/category.model";
import {TodoModel} from "./models/todo.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogTodoDataOut{
  category: CategoryModel
  todoText: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'oblako-test-task2';

  categories: CategoryModel[] = []

  ngOnInit(): void {

    this.categories.push(new CategoryModel(1, 'Семья',
      [
        new TodoModel(1, 'Купить молока'),
        new TodoModel(2, 'Заплатить за кровлю', true)
      ]))

    this.categories.push(new CategoryModel(2, 'Работа',
      [
        new TodoModel(3, 'Сделать робота', true),
        new TodoModel(4, 'Захватить мир')
      ]))

  }

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(DialogTodoAdd, {
      width: '250px',
      data: {categories: this.categories},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if(result === undefined){
        return
      }

      let data: DialogTodoDataOut = result
      data.category.addTodo(new TodoModel(0, data.todoText))
    });
  }
}

@Component({
  selector: 'dialog-todo-add',
  templateUrl: 'dialog-todo-add.html',
})
export class DialogTodoAdd implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogTodoAdd>,
    @Inject(MAT_DIALOG_DATA) public categories: {categories: CategoryModel[]},
  ) {}

  out: DialogTodoDataOut = {
    category: new CategoryModel(1, "null", []),
    todoText: ''
  }

  ngOnInit(): void {
    console.log(this.categories.categories)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
