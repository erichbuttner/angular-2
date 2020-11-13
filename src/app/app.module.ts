import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { FormsModule } from '@angular/forms';
import { TaskHistoryComponent } from './task/task-history/task-history.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskListComponent,
    TaskCreateComponent,
    TaskHistoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoFieldModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
