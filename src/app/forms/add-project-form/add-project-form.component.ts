import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(55)], updateOn: 'change'}), description: this.fb.control('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)], updateOn: 'change' })
  })

  constructor(private projectService: ProjectService, private fb: FormBuilder) { }

  addNewProject(project: Project) {
    this.projectService.addProject(project).subscribe(val => {
      console.log('---- Added new Project ----')
      console.log(val)
    })
  }

  updateProject(project: Project) {
    this.projectService.addProject(project).subscribe(val => {
      console.log('---- Project updated ----')
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
