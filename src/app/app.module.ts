import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BacklogComponent } from './backlog/backlog.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
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
