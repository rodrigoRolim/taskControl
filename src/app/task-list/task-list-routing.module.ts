import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list.component';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { AuthGuardService as AuthGuard } from '../auth-guard.service';
const taskRoutes: Routes = [
    {
        path: 'tasks', 
        component: TaskListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks/save',
        component: TaskCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks/detail',
        component: TaskCreateComponent,
        canActivate: [AuthGuard]
     
    },
    {
        path: 'tasks/all/:state',
        component: TaskDetailComponent,
        canActivate: [AuthGuard],
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
