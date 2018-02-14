import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { TaskService } from  '../task.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { RadioControlValueAccessor } from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  tasks: Task[] = [];
  task: Task;
  isNew: boolean = true;
  states: number;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) { }
  value:number;
  ngOnInit() {
    this.route.params.subscribe(params => {
     this.value = +params['id'];
    //console.log(this.value);
    this.task = new Task();
    this.task.state = 1;
    this.task.color = "#23244D";
      if(this.value > 0){
        this.isNew = false;
        this.taskService.getTask(this.value).subscribe(task => {
          this.task = task;
        });
      } 
    });
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  save(): void {
    this.taskService.updateTask(this.task)
      .subscribe(() => this.goBack())
  }
  goBack(): void {
    this.location.back();
  }
  onSubmit(f:any, t:any, dng:any, dn:any): void {
    //let observableTask: Observable<Task>;
    console.log(f.value.step);
    if(this.isNew){
      this.task.state = +f.value.step;
      this.taskService.addTask(this.task).subscribe(task => { 
      console.log(task); 
      this.goBack()});
     console.log("entrei no if");
    } else {
      this.task.state = (t.checked)? 1: (dng.checked)? 2: 3;  
      console.log("entrei no else");
      
      this.taskService.updateTask(this.task).subscribe(() => this.goBack())
    }
  }
  getFormControlClass(isValid: boolean, isPristine: boolean):{} {
    return {
        'form-control': true,
        'form-control-danger': !isValid && !isPristine,
        'form-control-success': isValid && !isPristine
    };
  }
  getFormGroupClass(isValid: boolean, isPristine: boolean):{} {
    return {
      'form-group': true,
      'has-danger': !isValid && !isPristine,
      'has-success': isValid && !isPristine
    };
  }

}
