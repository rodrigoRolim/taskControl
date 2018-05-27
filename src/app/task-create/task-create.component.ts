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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
    // this.route.params.subscribe(params => {
    // this.value = +params['id'];
     this.task = new Task();
     this.task.state = 1;
     this.task.color = "#23244D";
      if(this.taskService.existTaskForEdition()){
        this.isNew = false;
        this.taskService.getTaskForEdition().subscribe(task => {
          console.log(task);
          this.task = task;
        });
      } 
   // });
    const obj = {token: localStorage.getItem('token')};
    this.taskService.getTasks(obj).subscribe(tasks => {
      this.tasks = tasks;
    });
    this.taskService.setTaskForEdition(new Task());
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
      const obj = {token: localStorage.getItem('token'), task: this.task};
      console.log(obj);
      this.taskService.addTask(obj).subscribe(task => { 
        //console.log(task); 
        this.goBack()
      });
     //console.log("entrei no if");
    } else {
      this.task.state = (t.checked)? 1: (dng.checked)? 2: 3;  
      console.log("entrei no else");
      console.log(this.task);
      const obj = {token: localStorage.getItem('token'), task: this.task}
      this.taskService.updateTask(obj).subscribe(() => this.goBack())
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
