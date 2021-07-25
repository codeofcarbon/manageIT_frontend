import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './routes/table/table.component';
import { TaskFormComponent } from './forms/task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BacklogComponent } from './routes/backlog/backlog.component';
import { SprintFormComponent } from './forms/sprint-form/sprint-form.component';
import { AddTaskFormComponent } from './forms/add-task-form/add-task-form.component';
import { AddProjectFormComponent } from './forms/add-project-form/add-project-form.component';
import { ProjectSettingsComponent } from './routes/project-settings/project-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    VerticalNavbarComponent,
    TableComponent,
    TaskFormComponent,
    BacklogComponent,
    SprintFormComponent,
    AddTaskFormComponent,
    AddProjectFormComponent,
    ProjectSettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
