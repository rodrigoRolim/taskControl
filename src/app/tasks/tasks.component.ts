import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
 
  task: Task = {descricao:'isso é uma tarefa a ser feita'};
  constructor() { }

  ngOnInit() {
  }

}
