import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/home/routes/table/table.component';
import { Task, TaskService } from '../../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-form',
  templateUrl: '../task-form/task-form.component.html',
  styleUrls: ['../task-form/task-form.component.css']
})
export class TaskFormTableComponent extends TaskFormComponent implements OnInit {

  task: Task = null

  constructor(protected taskService: TaskService, protected route: ActivatedRoute, protected location: Location, private tableComp: TableComponent) {
    super()
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
      this.tableComp.ngOnInit()
    },  err => {
      this.error = err.error.message
      console.log(err.error)
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
