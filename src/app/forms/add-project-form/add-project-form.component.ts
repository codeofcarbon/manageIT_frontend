import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project, ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.css']
})
export class AddProjectFormComponent implements OnInit {

  project: Project
  @Input() params = null
  projectForm = this.fb.group({
    id: this.fb.control(null, { updateOn: 'change' }),
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(55)], updateOn: 'change'}), description: this.fb.control('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)], updateOn: 'change' }),
    owner: this.fb.group({
      username: this.fb.control(`${this.router.url.split('/')[1]}`, {validators: [Validators.required], updateOn: 'change'})
    })
  })

  // Po ukończeniu podstawowych funkcjonalności zastanowić sie nad przerobieniem add-task-form i task-form na 
  // bardziej podobne do AddProjectComponent
  constructor(private projectService: ProjectService, private fb: FormBuilder,private router: Router) {
   }

  addNewProject(project: Project) {
    this.projectService.addProject(project).subscribe(val => {
      console.log('---- Added new Project ----')
      document.getElementById('close-button').click()
      window.location.reload()
      console.log(val)
    })
  }
  
  updateProject(project: Project) {
    this.projectService.updateProject(project).subscribe(val => {
      console.log('---- Project updated ----')
      window.location.reload()
      console.log(val)
    })
  }

  getProject() {
    this.projectService.getProjectById(this.params.id).subscribe(val => {
      this.project = val
      this.projectForm.setControl('id', this.fb.control(`${this.project.id}`))
      this.projectForm.setControl('name', this.fb.control(`${this.project.name}`))
      this.projectForm.setControl('description', this.fb.control(`${this.project.description}`))
    })
  }

  ngOnInit(): void {
    if (this.params != null) {
      this.getProject()
    }
  }

}
