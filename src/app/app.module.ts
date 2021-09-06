import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FooterComponent } from './home/footer/footer.component';
import { VerticalNavbarComponent } from './home/vertical-navbar/vertical-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './home/routes/table/table.component';
import { TaskFormTableComponent } from './forms/task/task-form-table/task-form-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BacklogComponent, ProgressPipe } from './home/routes/backlog/backlog.component';
import { SprintFormComponent } from './forms/sprint-form/sprint-form.component';
import { AddTaskFormComponent } from './forms/task/add-task-form/add-task-form.component';
import { AddProjectFormComponent } from './forms/add-project-form/add-project-form.component';
import { ProjectSettingsComponent } from './home/routes/project-settings/project-settings.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TaskFormBacklogComponent } from './forms/task/task-form-backlog/task-form-backlog.component';
import { TaskFormComponent } from './forms/task/task-form/task-form.component';
import { httpInterceptorsProviders } from './http_interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    VerticalNavbarComponent,
    TableComponent,
    TaskFormTableComponent,
    BacklogComponent,
    SprintFormComponent,
    AddTaskFormComponent,
    AddProjectFormComponent,
    ProjectSettingsComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    TaskFormBacklogComponent,
    TaskFormComponent,
    ProgressPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
