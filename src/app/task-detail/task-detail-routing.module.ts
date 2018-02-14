import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
const taskRoutes: Routes = [
    // {
    //     path: 'tasks/all',
    //     component: TaskCreateComponent,
    //     children: [
    //       {
    //         path: 'todo/detail/:id',
    //         redirectTo: '',
    //         pathMatch: 'full' 
    //       },
    //       {
    //         path: 'doing/detail/:id',
    //         component: TaskCreateComponent
    //       },
    //       {
    //         path: 'done/detail/:id',
    //         component: TaskCreateComponent
    //       }
    //     ]
    // }, 
    // {
    //     path: '../detail/:id',
    //     component: TaskCreateComponent
    // }
];
@NgModule({
    imports: [
        RouterModule.forChild(taskRoutes)
    ]
})
export class TaskListRoutingModule {}
