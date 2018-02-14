import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Task } from '../task';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {
  @Input() busca: string;
  @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
  tasks: Observable<Task[]>;
  task: Task[];
  private termosDaBusca: Subject<string> = new Subject<string>();
  constructor(
      private taskService: TaskService,
      private router: Router
  ) {}

  ngOnInit(): void {
      this.tasks =  this.termosDaBusca
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.taskService.search(term) : Observable.of<Task[]>([]))
      .catch(err => {
          console.log(err);
          return Observable.of<Task[]>([]);   
      });
      this.getTasks();
  }
  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.task = tasks);
  }
  ngOnChanges(changes: SimpleChanges): void {
      let busca: SimpleChange = changes['busca'];
      console.log(busca);
      this.search(busca.currentValue);
  }
  search(termo: string): void {
      console.log(termo);
      this.termosDaBusca.next(termo);
      this.buscaChange.emit(termo);
  }
  verDetalhe(task: Task): void {
      let link = ['tarefa/save', task.id];
      this.router.navigate(link);
  }
}
