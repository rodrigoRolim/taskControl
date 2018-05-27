import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { TASKS } from './mock-tasks';
import { catchError, map, tap } from 'rxjs/operators';
import { Http, Headers, Response } from  '@angular/http';
import { User } from './user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class TaskService {
  //private tasksUrl = "api/tasks";
  private tasksUrl = "http://192.168.100.3:3000";
  private task: Task;
  constructor( 
    private http: HttpClient
    //private messageService: MessageService
  ) { }
  getTasks(obj: any): Observable<Task[]> {
    const url = `${this.tasksUrl}/tasks`;
    return this.http.post<Task[]>(url, obj, httpOptions)
      .pipe(
        catchError(this.handleError('getTasks', []))
      );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      //tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  updateTask(tokenTask: any): Observable<any> {
    const url = `${this.tasksUrl}/update`;
    return this.http.post(url, tokenTask, httpOptions).pipe(
      catchError(this.handleError<any>('updateTask'))
    )
  }
  addTask(tokenTask: any){
    const url = `${this.tasksUrl}/task`;
    return this.http.post<any>(url, JSON.stringify(tokenTask), httpOptions).pipe(
      catchError(this.handleError<any>('addTask'))
    );
  }
  deleteTask(task: Task): Observable<Task> {
    //const id = typeof task === 'number' ? task: task.id;
    const url = `${this.tasksUrl}/remove`;
    const obj = {token: localStorage.getItem('token'), id: task.id};
    return this.http.post<Task>(url, obj, httpOptions).pipe(
      catchError(this.handleError<Task>('deleteTask'))
    );
  }
  search(term: string): Observable<Task[]> {
    console.log(term+" away");
    return this.http
        .get(`${this.tasksUrl}/?tarefa=${term}`)
        .map((res : Response) => res.json().data as Task[]);

  }
  getTokenUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.tasksUrl}/register`, user, httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }
  getLogin(user: User): Observable<any> {
    return this.http.post<User>(`${this.tasksUrl}/login`, user, httpOptions).pipe(
      catchError(this.handleError<User>('login'))
    );
  }
  setTaskForEdition(task: Task): void {
    this.task = task;
  }
  getTaskForEdition(): Observable<Task> {
    return Observable.of(this.task);
  }
  existTaskForEdition(): boolean {
    return this.task !== undefined ? true : false;
  }
}
