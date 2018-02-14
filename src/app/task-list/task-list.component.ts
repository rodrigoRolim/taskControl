import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  // template: `
  //   <router-outlet></router-outlet>
  // `
})
export class TaskListComponent implements OnInit {
  msg='';
  tasks: Task[];
  taskSelected: Task;
  
  // tasks: Task[] = [
  //   {id:1, tarefa:'Tarefa A', descricao:'Realizar Tarefa A', color:'rgba(16, 134, 75, 0.575)', state: 1},
  //   {id:2, tarefa:'Tarefa B', descricao:'Realizar Tarefa B', color:'rgba(16, 134, 75, 0.575)', state: 1},
  //   {id:3, tarefa:'Tarefa C', descricao:'Realizar Tarefa C', color:'rgba(118, 7, 161, 0.651)', state: 2},
  //   {id:4, tarefa:'Tarefa D', descricao:'Realizar Tarefa D', color:'rgba(14, 98, 167, 0.801)', state: 3},
  //   {id:5, tarefa:'Tarefa E', descricao:'Realizar Tarefa E', color:'rgba(118, 7, 161, 0.651)', state: 3},
  //   {id:6, tarefa:'Tarefa F', descricao:'Realizar Tarefa F', color:'rgba(14, 98, 167, 0.801)', state: 1},
  // ];
  constructor(
    private dragulaService: DragulaService,
    private taskService: TaskService
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
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
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
    console.log({args});
    console.log(args[2].classList.value);
    let id: number = +args[0].title; 
    if(args[2].classList.value == 'done' && args[1].classList.value != 'done') {
      console.log(+args[0].title);
      this.taskService.getTask(id).subscribe(task =>{
        task.state = (args[1].classList.value == 'doing')? 2 : 1;
        this.taskService.updateTask(task).subscribe();
      });
    }
    if(args[2].classList.value == 'doing' && args[1].classList.value != 'doing') {
      console.log(+args[0].title);
      this.taskService.getTask(id).subscribe(task =>{
        task.state = (args[1].classList.value == 'todo')? 1 : 3;
        this.taskService.updateTask(task).subscribe();
      });
     }
    if(args[2].classList.value == 'todo' && args[1].classList.value != 'todo') {
      console.log(+args[0].title);
      this.taskService.getTask(id).subscribe(task =>{
        task.state = (args[1].classList.value == 'doing')? 2 : 3;
        this.taskService.updateTask(task).subscribe();
      });
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
   let task: Task[] = this.tasks.filter(t => t.state == +s);
  // console.log(task);
    return task;
  }
  deleteAll(s: number): void {
    this.tasks.forEach(t => {
      if(t.state === +s){
        this.delete(t);
      }
    }); 
  }
 
}
