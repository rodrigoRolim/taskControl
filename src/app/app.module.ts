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

import { DragulaModule } from 'ng2-dragula/ng2-dragula';


import { Task } from './task';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './/app-routing.module';
import { TaskListRoutingModule } from './task-list/task-list-routing.module';
import { TaskService } from './task.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TaskLoginComponent } from './task-login/task-login.component';

// import { NgxPageNotFoundComponent } from '@4geit/ngx-page-not-found-component';
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskCreateComponent,
    TaskSearchComponent,
    TaskLoginComponent
  
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
    HttpModule,

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [ TaskService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
