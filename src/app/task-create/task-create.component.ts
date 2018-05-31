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
  tasks: Task[];
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
      this.task = new Task();
      //this.task.tarefa = "";
      // this.task.descricao = "";
      this.task.state = 1;
      this.task.color = "#23244D";
      this.value = +params['id'];
      if(this.value > 0) {
        console.log("entrou");
        console.log(this.value);
        this.isNew = false;
        this.getTasks(this.value);
      }
    });
  }
  getTasks(value:number): void {
    const obj = {token: localStorage.getItem('token')};
    this.taskService.getTasks(obj)
    .subscribe(tasks => { 
      this.task = tasks.find(task => +task.id == value)
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

    if(this.isNew){
      this.task.state = +f.value.step;
      const obj = {token: localStorage.getItem('token'), task: this.task};
      console.log(obj);
      this.taskService.addTask(obj).subscribe(task => { 
        this.goBack()
      });
   
    } else {
      this.task.state = (t.checked)? 1: (dng.checked)? 2: 3;  
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
