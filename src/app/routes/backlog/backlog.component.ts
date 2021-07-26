import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sprint, SprintService } from '../../services/sprint.service';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  public searchKey: FormControl = new FormControl('')
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
      tasksIds: [],
      active: false
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
  
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe( () => {
      console.log('---- Task Deleted ----')
      this.getAllSprints()
      this.getAllTasks()
    })
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
   
    if(results.length == 0 && key) {
      this.sprints = []
      return
    }
    if(results.length == 0 || !key) {
      this.getAllSprints()
      return
    }

    this.sprints = results
  }

  ngOnInit(): void {
    this.getAllSprints()
    this.getAllTasks()
  }
}
