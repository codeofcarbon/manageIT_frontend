import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: 'task-form.component.html',
  styleUrls: ['task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  error
  params
  taskForm: FormGroup = new FormGroup({
    id: new FormControl('', { validators: [], updateOn: 'change' }),
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(55)], updateOn: "change" }),
    description: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)], updateOn: "change" }),
    storyPoints: new FormControl('', { validators: [Validators.max(10)], updateOn: "change" }),
    progress: new FormControl("TO_DO", { validators: [Validators.required], updateOn: "change" }),
    priority: new FormControl("NOT_AT_ALL", { validators: [Validators.min(0), Validators.max(4)], updateOn: "change" }),
    sprint: new FormGroup({
      id: new FormControl('', { updateOn: "change" })
    })
  }
  )

  constructor() { }

  saveTask(task: Task) {

  }

  ngOnInit(): void {
  }
}
