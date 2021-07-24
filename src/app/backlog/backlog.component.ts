import { Component, OnInit } from '@angular/core';
import { Sprint, SprintService } from '../services/sprint.service';
import { Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  sprints: Sprint[] = []
  tasks: Task[] = []

  constructor(private sprintService: SprintService, private taskService: TaskService) { }

  getAllSprints() {
    this.sprintService.getAllSprints().subscribe(val => {
      this.sprints = val
      this.sprints.forEach(e => console.log(e))
    })
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(val => {
      this.tasks = val
    })
  }

  ngOnInit(): void {
    this.getAllSprints()
    this.getAllTasks()
  }
}
