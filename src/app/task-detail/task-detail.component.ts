import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService} from '../task.service';
import { Task } from '../task';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  tasks: Task[];
 
  state: number;
  constructor( 
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      console.log(param['state']);
      this.state = (param['state'] === 'todo')? 1: (param['state'] === 'doing')? 2 : 3;
      console.log(this.state); 
    })
    this.getTasks();
   
  }
  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks.filter(t => t.state === this.state));
  }
}
