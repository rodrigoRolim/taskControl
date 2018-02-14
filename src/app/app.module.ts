import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskAllComponent } from './task-all/task-all.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './/app-routing.module';
import { TaskListRoutingModule } from './task-list/task-list-routing.module';
import { TaskService } from './task.service';
import { HttpClientModule } from '@angular/common/http';
// import { NgxPageNotFoundComponent } from '@4geit/ngx-page-not-found-component';
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskCreateComponent,
    TaskAllComponent,
    // NgxPageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragulaModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    TaskListRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [ TaskService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
