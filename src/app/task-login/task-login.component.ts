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
    this.loginUser();
  }
  loginUser(): void {
    this.taskService.getLogin(this.user).subscribe(obj => {
      (!obj.error) ? this.router.navigate(['home']) : this.message = true;
    });
    
  }
}
