import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class HttpHandlerService{

  constructor(private http: HttpClient) { }

  get(query: string): Observable<any>{
    return this.http.get('https://oblako-test-ask.herokuapp.com/graphql?query=' + query)
  }

  post(query: string, vars: object): Observable<any>{
    console.log(vars)
    return this.http.post(
      'https://oblako-test-ask.herokuapp.com/graphql',
      JSON.stringify({"query": query, "variables": vars}),
      httpOptions
      )
  }
}
