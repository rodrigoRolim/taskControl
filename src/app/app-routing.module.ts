import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component'; 
import { TaskListComponent } from './task-list/task-list.component';
const routes: Routes = [
  {  
    path: 'tarefas', 
    component: TaskListComponent,
    data: {title:'Task list'},
    // children: [
    //   {
    //     path: 'create',
    //     component: TaskCreateComponent
    //   }
    // ]
  },
  { 
    path: '',
    redirectTo: '/tarefas', 
    pathMatch:'full' 
  },
  {
    path: 'tarefas/create/:id',
    component: TaskCreateComponent
  }
  
];
@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
 
})
export class AppRoutingModule { }
