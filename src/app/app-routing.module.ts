import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { BacklogComponent } from './backlog/backlog.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';


const routes: Routes = [
  {path: '', redirectTo: '/table', pathMatch: 'full'},
  {path: 'table', component: TableComponent, children: [
    {path: 'edit/:id', component: TaskFormComponent}
  ]},
  {path: 'backlog', component: BacklogComponent, children: [
    {path: 'sprint/edit/:id', component: SprintFormComponent},
    {path: 'task/edit/:id', component: TaskFormComponent}
  ]}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
