import { Component,OnInit } from '@angular/core';
import { Task } from '../task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-navbar',
  templateUrl: './task-navbar.component.html',
  styleUrls: ['./task-navbar.component.css']
})

export class TaskNavbarComponent {
  value:Number;
  
  constructor(private route: ActivatedRoute, private routes: Router) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
     this.value = params['id'];
     console.log(this.value); 
    });
  }
 onLogout(): void {
   localStorage.removeItem('token');
   this.routes.navigate(['login']);
 }
}