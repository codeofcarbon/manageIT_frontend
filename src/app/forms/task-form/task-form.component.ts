import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/routes/table/table.component';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: '../add-task-form/add-task-form.component.html',
  styleUrls: ['../add-task-form/add-task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() task: Task = null
  params
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

  constructor(private tableComp: TableComponent,private taskService: TaskService, public route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.params = params
      console.log(params)
      this.getTask()
    })
   }

  saveTask(task: Task) {
    this.taskService.updateTask(task).subscribe(val => {
      this.task = val
      document.getElementById('close-button').click()
      // window.location.reload()
      this.tableComp.getAllSprints()
      this.tableComp.getAllTasks()
    })
  }

  getTask() {
    this.taskService.getTaskById(this.params.id).subscribe((val) => {
      console.log(val)
      this.task = val
      this.taskForm.setValue({
        id: this.task.id,
        name: this.task.name,
        description: this.task.description,
        storyPoints: this.task.storyPoints,
        progress: this.task.progress,
        priority: this.task.priority,
        sprint: {
          id: this.task.sprintId
        },
      })
    })
  }

  ngOnInit(): void {
    this.getTask()
  }
}
