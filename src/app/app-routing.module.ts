import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskHistoryComponent } from './task/task-history/task-history.component';
import { TaskListComponent } from './task/task-list/task-list.component';

const routes: Routes = [
  {path: '', component: TaskListComponent},
  {path: 'create-task', component: TaskCreateComponent},
  {path: 'history', component: TaskHistoryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
