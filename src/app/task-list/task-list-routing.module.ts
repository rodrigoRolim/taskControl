import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list.component';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

const taskRoutes: Routes = [
    {
        path: 'tasks', 
        component: TaskListComponent
    },
    {
        path: 'tasks/save',
        component: TaskCreateComponent
    },
    {
        path: 'tasks/detail/:id',
        component: TaskCreateComponent
     
    },
    {
        path: 'tasks/all/:state',
        component: TaskDetailComponent,
        children: [
            {
                path: 'todo',
                component: TaskDetailComponent
            },
            {
                path: 'doing',
                component: TaskDetailComponent
            },
            {
                path: 'done',
                component: TaskDetailComponent
            }
        ] 
    },
    {
        path: '**', redirectTo: 'tasks',  pathMatch: 'full' 
    }
   
];
@NgModule({
    imports: [
        RouterModule.forChild(taskRoutes)
    ]
})
export class TaskListRoutingModule {}
