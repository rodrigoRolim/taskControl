import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component'; 
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';


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
 // { path: '**', component: TaskListComponent }
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
