import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  msg='';
  tasks: Task[];
  taskSelected: Task;
  
  constructor(
    private dragulaService: DragulaService,
    private taskService: TaskService,
    private route: Router
  ) { 
   
    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
  }

  ngOnInit() {
      this.dragulaService
        .drag
        .subscribe(value => {
          this.msg = `Dragging the ${ value[1].innerText}!`;
        });
        this.dragulaService
      .drop
      .subscribe(value => {
        this.msg = `Dropped the ${ value[1].innerText }!`;

        setTimeout(() => {
          this.msg = '';
        }, 1000);
      });
      this.getTasks();
    
  }
  getTasks(): void {
    const obj = {token: localStorage.getItem('token')};
    this.taskService.getTasks(obj)
      .subscribe(tasks => {
        console.log(tasks);
        this.tasks = tasks;
      });
  }
  onSelect(task: Task): void {
    this.taskSelected = task;
  }
  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }
  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }
  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
    console.log(name);
    console.log(el);
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    this.addClass(e, 'ex-moved');
    //console.log({args});
    //console.log(args[2].classList.value);
    let id: number = +args[0].id; 
    if(args[2].classList.value == 'done' && args[1].classList.value != 'done') {
       const task = this.tasks.find(task => task.id == id);
       task.state = (args[1].classList.value == 'doing ex-over')? 2 : 1;
       const obj = {token: localStorage.getItem('token'), task: task}
       this.taskService.updateTask(JSON.stringify(obj)).subscribe();
    }
    if(args[2].classList.value == 'doing' && args[1].classList.value != 'doing') {
      const task = this.tasks.find((task) => task.id == id);
      task.state = (args[1].classList.value == 'todo ex-over')? 1 : 3;
      console.log(task);  
      const obj = {token: localStorage.getItem('token'), task: task}
      this.taskService.updateTask(JSON.stringify(obj)).subscribe();
    }
    if(args[2].classList.value == 'todo' && args[1].classList.value != 'todo') {
      const task = this.tasks.find(task => task.id == id);
      console.log(task);
      task.state = (args[1].classList.value == 'doing ex-over')? 2 : 3;
      const obj = {token: localStorage.getItem('token'), task: task}
      this.taskService.updateTask(JSON.stringify(obj)).subscribe();
    }
  }

  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }
  filterTaskOfState(s: number): Task[] {
   const task: Task[] = (this.tasks !== undefined ) ? this.tasks.filter(t => t.state == +s): [];
    return task;
  }
  deleteAll(s: number): void {
    this.tasks.forEach(t => {
      if(t.state === +s){
        this.delete(t);
      }
    }); 
  }
  onEdit(task: Task): void {
    this.taskService.setTaskForEdition(task);
    this.route.navigate(['tasks/detail']);
    console.log("fudeu");
  }
}
