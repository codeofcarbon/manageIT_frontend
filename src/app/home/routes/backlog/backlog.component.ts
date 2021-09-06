import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Sprint, SprintService } from '../../../services/sprint.service';
import { Task, TaskService } from '../../../services/task.service';

@Pipe({
  name: "progress"
}) 
export class ProgressPipe {
  transform(nazwa: string) {
    if(nazwa === 'TO_DO') {
      return 'TO DO'
    }
    if(nazwa === 'IN_PROGRESS') {
      return 'IN PROGRESS'
    }
    if(nazwa === 'DONE') {
      return 'DONE'
    }
    return 'UNKNOWN'
  }
}

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  error: string = null
  projectId = parseInt(this.router.url.split('/')[2])
  user
  public searchKey: FormControl = new FormControl('')
  private counter = null;
  sprints: Sprint[] = []
  tasks: Task[] = []
  selectedSprint: Sprint

  constructor(private sprintService: SprintService, private taskService: TaskService, private projectService: ProjectService, private router: Router) { }

  progressStyle(progress: string) {
    if(progress === 'TO_DO') {
      return 'to-do'
    }
    if(progress === 'IN_PROGRESS') {
      return 'in-progress'
    }
    if(progress === 'DONE') {
      return 'done'
    }
    return 'unknown'
  }

  getAllSprints() {
    console.log(this.projectId)

    this.projectService.getProjectById(this.projectId).subscribe(val => {
      console.log(val)
      this.sprints = val.sprints
      // this.sprints = val
      console.log(this.sprints)
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
      project: {
        id: this.projectId
      }
    }

    this.sprintService.addSprint(basicSprint).subscribe(val => {
      console.log('---- Dodano nowy Sprint ----')
      console.log(val)
      this.getAllSprints()
      this.getAllTasks()
    })
  }

  deleteSprint(id: number) {
    this.sprintService.deleteSprint(id).subscribe(() => {
      document.getElementById('close-button').click()
      console.log('---- Sprint deleted ----')
      this.getAllSprints()
      this.getAllTasks()
    })
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      console.log('---- Task Deleted ----')
      this.getAllSprints()
      this.getAllTasks()
    })
  }

  changeSprintToActive(id: number) {
    this.sprintService.updateToActive(id).subscribe(val => {
      console.log('---- Changed Sprint to active')
      console.log(val)
      this.getAllSprints()
      this.getAllTasks()
    }, err => {
      this.error = err.error.message;
      document.getElementById('errorAlert').style.visibility = "visible"
      console.log(err.error);
    })
  }

  changeSprintToFinish(id: number) {
    this.sprintService.changeToNoActive(id).subscribe(val => {
      console.log('---- Finished Sprint')
      console.log(val)
      this.getAllSprints()
      this.getAllTasks()
    }, err => {
      this.error = 'There must be a date in the future';
      document.getElementById('errorAlert').style.visibility = "visible"
      console.log(err.error)
    })
  }

  selectSprint(sprint: Sprint) {
    this.selectedSprint = sprint;
  }

  public searchSprints(key: string): void {
    console.log(key);
    let results: Sprint[] = [];
    for (const sprint of this.sprints) {
      if (sprint.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(sprint);
      }
    }

    console.log(results)

    if (results.length == 0 && key) {
      this.sprints = []
      return
    }
    if (results.length == 0 || !key) {
      this.getAllSprints()
      return
    }

    this.sprints = results
  }

  assignTaskToSprint(task: Task, sprintId: number) {
    const assignedTask = {
      id: task.id,
      name: task.name,
      description: task.description,
      storyPoints: task.storyPoints,
      progress: task.progress,
      priority: task.priority,
      sprint: {
        id: sprintId
      },
    }

    console.log(assignedTask)

    this.taskService.assignToSprint(assignedTask).subscribe(() => {
      console.log('Przypisano do sprint ' + sprintId)
      this.getAllSprints()
      this.getAllTasks()
    }, err => {
      this.error = err.error.message;
      document.getElementById('errorAlert').style.visibility = "visible"
      console.log(err.error);
    })
  }

  ngOnInit(): void {
    const username = this.router.url.split('/')[1]
    this.user = username
    this.getAllSprints()
    this.getAllTasks()
  }
}
