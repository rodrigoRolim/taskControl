import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Task } from '../task';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  msg='';
  tasks: Task[] = [
   {tarefa:'Tarefa A', descricao:'Realizar Tarefa A'},
   {tarefa:'Tarefa B', descricao:'Realizar Tarefa B'},
   {tarefa:'Tarefa C', descricao:'Realizar Tarefa C'},
   {tarefa:'Tarefa D', descricao:'Realizar Tarefa D'},
   {tarefa:'Tarefa E', descricao:'Realizar Tarefa E'},
   {tarefa:'Tarefa F', descricao:'Realizar Tarefa F'},
  ];
  constructor(private dragulaService: DragulaService) { 
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
  }
  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
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
  }

  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }

}
