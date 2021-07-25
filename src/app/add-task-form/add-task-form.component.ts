import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {

  params;
  taskForm: FormGroup = new FormGroup({
    id: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(55)], updateOn: "change" }),
    description: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)], updateOn: "change" }),
    storyPoints: new FormControl('', { validators: [Validators.max(10)], updateOn: "change" }),
    progress: new FormControl("TO_DO", { validators: [Validators.required], updateOn: "change" }),
    priority: new FormControl('', { validators: [Validators.min(1), Validators.max(5)], updateOn: "change" }),
    sprint: new FormGroup({
      id: new FormControl('', { validators: [Validators.required], updateOn: "change" })
    })
  }
  )

  constructor(public sprintService: SprintService, public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.params = params
      this.getSprintId()
    }
    )
  }

  getSprintId() {
    this.taskForm.setValue({
      id: '',
      name: '',
      description: '',
      storyPoints: '',
      progress: '',
      priority: '',
      sprint: {
        id: this.params.id
      },
    })

  }

  ngOnInit(): void {
  }

}
