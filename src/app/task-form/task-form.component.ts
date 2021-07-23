import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { Task } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  public task: Task = null

  public taskForm: FormGroup = new FormGroup({
    name: new FormControl('dsfsdf', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(55)], updateOn: "change"}),
    description: new FormControl("", {validators: [], updateOn: "change"}),
    storyPoints: new FormControl(0, {validators: [], updateOn: "change"}),
    progress: new FormControl("To do", {validators: [], updateOn: "change"}), 
    priority: new FormControl("1", {validators: [], updateOn: "change"}), 
    sprintId: new FormControl(1, {validators: [], updateOn: "change"}), 
  }
  )

  constructor() { }

  show() {
    console.log(this.taskForm.value)
  }

  ngOnInit(): void {
  }

}
