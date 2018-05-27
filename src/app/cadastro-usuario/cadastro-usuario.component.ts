import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) { }
  user: User = new User();
  username: string;
  password: string;
  y = false;
  ngOnInit() {
  }
  onSubmit(): void {
    event.stopPropagation(); 
    this.user.username = this.username;
    this.user.password = this.password;
    this.addUser();
  }
  addUser(): void {
    this.taskService.getTokenUser(this.user).subscribe(obj => {
      localStorage.setItem('token', obj.token);
      if(!obj.error) this.router.navigate(['/home']);
      else this.y = true;
    });
  }
}
