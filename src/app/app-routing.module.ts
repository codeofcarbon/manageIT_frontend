import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './home/routes/table/table.component';
import { BacklogComponent } from './home/routes/backlog/backlog.component';
import { TaskFormTableComponent } from './forms/task-form-table/task-form-table.component';
import { SprintFormComponent } from './forms/sprint-form/sprint-form.component';
import { AddTaskFormComponent } from './forms/add-task-form/add-task-form.component';
import { ProjectSettingsComponent } from './home/routes/project-settings/project-settings.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TaskFormBacklogComponent } from './forms/task-form-backlog/task-form-backlog.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: ':id', component: HomeComponent, children: [
      {path: ':project/table', component: TableComponent, children: [
        {path: 'edit/:id', component: TaskFormTableComponent}
      ]},
      {path: ':project/backlog', component: BacklogComponent, children: [
        {path: 'sprint/edit/:id', component: SprintFormComponent},
        {path: 'task/edit/:id', component: TaskFormBacklogComponent},
        {path: 'task/add/:id', component: AddTaskFormComponent}
      ]}, 
      {path: 'project/settings/:id', component: ProjectSettingsComponent}
    ]}
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
