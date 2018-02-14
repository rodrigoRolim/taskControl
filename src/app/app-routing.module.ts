import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component'; 
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskLoginComponent } from './task-login/task-login.component';


const routes: Routes = [
  // {  
  //   path: 'tarefas', 
  //   component: TaskListComponent,
  //   data: {title:'Task list'},
  //   // children: [
  //   //   {
  //   //     path: 'create',
  //   //     component: TaskCreateComponent
  //   //   }
  //   // ]
  // },
  { 
    path: '',
    redirectTo: '/tasks', 
    pathMatch:'full' 
  },
  {
    path: 'login',
    component: TaskLoginComponent
  }
//{ path: '**', redirectTo:'/tasks', pathMatch: 'full'}
  // {
  //   path: 'tarefas/create',
  //   component: TaskCreateComponent
  // },
  // {
  //   path: 'tarefas/detail/:id',
  //   component: TaskDetailComponent
  // }
  
];
@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
 
})
export class AppRoutingModule { }
