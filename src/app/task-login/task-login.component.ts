import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';
import {USER} from '../mock-users';
import { TaskService } from '../task.service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-task-login',
  templateUrl: './task-login.component.html',
  styleUrls: ['./task-login.component.css']
})
export class TaskLoginComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
     private route: ActivatedRoute) { }
  user: User = new User();
  username: string;
  password: string;
  message = false;
  ngOnInit() {
  }
  onSubmit(): void {
    this.user.username = this.username;
    this.user.password = this.password;
    this.loginUser(this.user);
  }
  loginUser(user: User): void {
    this.taskService.getLogin(user).subscribe(obj => {
      localStorage.setItem('token', obj.token);
      (!obj.error) ? this.router.navigate(['tasks']) : this.message = true;
    });
    
  }
}
