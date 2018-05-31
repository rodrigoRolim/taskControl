import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component'; 
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskLoginComponent } from './task-login/task-login.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/login', 
    pathMatch:'full' 
  },
  {
    path: 'login',
    component: TaskLoginComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    component: CadastroUsuarioComponent
  }
  
];
@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
 
})
export class AppRoutingModule { }
