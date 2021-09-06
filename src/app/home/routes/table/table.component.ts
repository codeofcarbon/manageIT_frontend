import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Sprint } from '../../../services/sprint.service';
import { Task, TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  projectId = parseInt(this.router.url.split('/')[2])
  user
  public sprint: Sprint = null
  public searchKey: FormControl = new FormControl('')
  public allSprints: Sprint[] = []
  public allTasks: Task[] = []
  public tasksInSprint: Task[] = []
  public toDo: Task[] = []
  public inProgress: Task[] = []
  public done: Task[] = []
  public counter = 0;

  constructor(private taskService: TaskService, private projectService: ProjectService, private router: Router) {
  }

  priority(state: string) {
    if (state == "0") {
      return "not-at-all"
    }
    if (state == "1") {
      return "kinda-important"
    }
    if (state == "2") {
      return "important"
    }
    if (state == "3") {
      return "very-important"
    }
    else return "asap"
  }

  checkProgress(task: Task) {
    if (task.progress === 'TO_DO') {
      this.toDo.push(task)
      return
    }

    if (task.progress === 'IN_PROGRESS') {
      this.inProgress.push(task)
      return
    }

    if (task.progress === 'DONE') {
      this.done.push(task)
      return
    }
  }

  public searchTasks(key: string): void {
    if (this.sprint == null) {
      return
    }
    console.log(key);
    let results: Task[] = [];
    for (const task of this.tasksInSprint) {
      if (task.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(task);
      }
    }

    console.log(results)

    this.toDo = []
    this.inProgress = []
    this.done = []
    results.forEach(e => this.checkProgress(e))
  }

  getAllTasks(id: number) {
    this.taskService.getAllTasks().subscribe(val => {
      this.allTasks = val
      this.tasksInSprint = this.allTasks.filter(e => e.sprintId == id)
      console.log(this.tasksInSprint)
      this.toDo = []
      this.inProgress = []
      this.done = []
      this.tasksInSprint.forEach(e => this.checkProgress(e))
    }, err => {
      console.log(err.error)
    })
  }

  getAllSprints() {
    this.projectService.getProjectById(this.projectId).subscribe((val => {
      console.log(val)
      const sprintId = this.checkWhichSprintIsActive(val.sprints).id
      this.getAllTasks(sprintId);
    }), err => {
      console.log(err.error)
    })
  }

  checkWhichSprintIsActive(sprints): Sprint {
    sprints.forEach(e => {
      if (e.active) {
        this.sprint = e
        return
      }
    })

    console.log(this.sprint)
    return this.sprint
  }

  ngOnInit(): void {
    const username = this.router.url.split('/')[1]
    this.user = username
    this.getAllSprints()
    console.log('HEJ TABLE')
  }

}
