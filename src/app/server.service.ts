import {Injectable} from "@angular/core";
import {CategoryModel} from "./models/category.model";
import {HttpHandlerService} from "./httpHandler.service";
import {Observable} from "rxjs";
import {TodoModel} from "./models/todo.model";

@Injectable()
export class ServerService {

  constructor(private httpHandler: HttpHandlerService) { }

  // Observable<CategoryModel[]>

  getData(): Observable<{data: {categories: CategoryModel[]}}>{
    const body = `{
    categories {
      id
      title
      todos {
         id
         text
         isCompleted
      }}}`

    return this.httpHandler.get(body)
  }

  addTodo(category_title: string, text: string): Observable<{data: {createTodo: TodoModel}}>{
    const body = `mutation ($cat: String!, $text: String!){
    createTodo(input: {
     categoryName: $cat,
     text: $text
    }) {
     id
     text
     isCompleted
    }
    }`

    // console.log(category_title)
    return this.httpHandler.post(body, {"cat": category_title, "text": text})

  }

  toggleTodo(id: number): Observable<{data: {toggleTodo: CategoryModel}}>{

    const body = `mutation($id: Float!){
    toggleTodo(id:$id){
    id
    text
    isCompleted
    }
    }`

    return this.httpHandler.post(body, {"id": id})
  }

}
