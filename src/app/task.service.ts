import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { TASKS } from './mock-tasks';
import { catchError, map, tap } from 'rxjs/operators';
import { Http, Headers, Response } from  '@angular/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class TaskService {
  private tasksUrl = "api/tasks";
  constructor( 
    private http: HttpClient
    //private messageService: MessageService
  ) { }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
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

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, httpOptions).pipe(
      catchError(this.handleError<any>('updateTask'))
    )
  }
  addTask(task: Task){
    return this.http.post<Task>(this.tasksUrl, task, httpOptions).pipe(
      catchError(this.handleError<Task>('addTask'))
    );
  }
  deleteTask(task: Task): Observable<Task> {
    const id = typeof task === 'number' ? task: task.id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, httpOptions).pipe(
      catchError(this.handleError<Task>('deleteTask'))
    );
  }
  search(term: string): Observable<Task[]> {
    console.log(term+" away");
    return this.http
        .get(`${this.tasksUrl}/?tarefa=${term}`)
        .map((res : Response) => res.json().data as Task[]);

}
}
