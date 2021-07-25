import { Component, OnInit } from '@angular/core';
import { Sprint, SprintService } from '../services/sprint.service';
import { Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  private counter = null;
  sprints: Sprint[] = []
  tasks: Task[] = []

  constructor(private sprintService: SprintService, private taskService: TaskService) { }

  getAllSprints() {
    this.sprintService.getAllSprints().subscribe(val => {
      this.sprints = val
      this.counter = this.sprints.length + 1
      console.log(this.counter)
    })
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(val => {
      this.tasks = val
    })
  }

  createNewSprint() {
    const basicSprint: Sprint = {
      name: `Sprint ${this.counter++}`,
      startDate: null,
      endDate: null,
      storyPointsToSpend: '0',
      tasksIds: []
    }

    this.sprintService.addSprint(basicSprint).subscribe(val => {
      console.log('Dodano nowy Sprint --')
      console.log(val)
      this.getAllSprints()
      this.getAllTasks()
    })
  }
  
  deleteSprint(id: number) {
    this.sprintService.deleteSprint(id).subscribe(() => {
      console.log('Sprint deleted')
      this.getAllSprints()
      this.getAllTasks()
    })
  }

  ngOnInit(): void {
    this.getAllSprints()
    this.getAllTasks()
  }
}
