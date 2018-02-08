import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskAllComponent } from './task-all/task-all.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskCreateComponent,
    TaskAllComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragulaModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
