import {Component, Inject, OnInit} from '@angular/core';
import {CategoryModel} from "./models/category.model";
import {TodoModel} from "./models/todo.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ServerService} from "./server.service";
import {plainToClass} from "class-transformer";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface DialogTodoDataOut{
  category: CategoryModel
  todoText: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oblako-test-task2';

  categories: CategoryModel[] = []

  ngOnInit(): void {



    // this.categories.push(new CategoryModel(1, 'Семья',
    //   [
    //     new TodoModel(1, 'Купить молока'),
    //     new TodoModel(2, 'Заплатить за кровлю', true)
    //   ]))
    //
    // this.categories.push(new CategoryModel(2, 'Работа',
    //   [
    //     new TodoModel(3, 'Сделать робота', true),
    //     new TodoModel(4, 'Захватить мир')
    //   ]))

    this.serverService.getData().subscribe((res) =>{
      let cats: CategoryModel[] = plainToClass(CategoryModel, res.data.categories);

      for(let i = 0; i < cats.length; i++){
        cats[i].todos = plainToClass(TodoModel, cats[i].todos)
        cats[i].todos = cats[i].todos.sort((n1, n2) => n1.id - n2.id)
      }
      console.log(cats)
      this.categories = cats

    })

  }

  constructor(public dialog: MatDialog, private serverService: ServerService) {
  }

  toggleTodo(category: CategoryModel, indexOfTodo: number){
    this.serverService.toggleTodo(category.todos[indexOfTodo].id).subscribe((res) => {
      category.todos[indexOfTodo] = plainToClass(TodoModel,  res.data.toggleTodo)
      console.log(category.todos[indexOfTodo])
    })
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
      // data.category.addTodo(new TodoModel(0, data.todoText))
      this.serverService.addTodo(data.category.title, data.todoText).subscribe((res) => {
        // console.log(plainToClass(TodoModel,  res.data.createTodo))
        data.category.todos.push(plainToClass(TodoModel,  res.data.createTodo))
      })
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

  form: FormGroup | undefined



  out: DialogTodoDataOut = {
    category: new CategoryModel(-1, "null", []),
    todoText: ''
  }

  ngOnInit(): void {
    console.log(this.categories.categories)

    this.form = new FormGroup({
      "input": new FormControl(null, [
        Validators.required,
        // this.inputValidator
      ]),

      "select": new FormControl(null, [
        Validators.required,
        this.selectValidator
      ])
    });
  }

  selectValidator(control: FormControl): {[s:string]:boolean}|null{
    if (control.value === null || control.value.id === -1){
      return {"select": true}
    }
    return null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
