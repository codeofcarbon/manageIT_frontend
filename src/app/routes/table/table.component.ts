import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sprint, SprintService } from '../../services/sprint.service';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public sprint: Sprint = null
  public searchKey: FormControl = new FormControl('')
  public allSprints: Sprint[] = []
  public allTasks: Task[] = []
  public tasksInSprint: Task[] = []
  public toDo: Task[] = []
  public inProgress: Task[] = []
  public done: Task[] = []
  public counter = 0;

  constructor(private taskService: TaskService, private sprintService: SprintService) {
  }

  checkProgress(task: Task) {

    // console.log(task)

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
      this.tasksInSprint.forEach(e => this.checkProgress(e))
    })
  }

  getAllSprints() {
    this.sprintService.getAllSprints().subscribe((val => {
      const sprintId = this.checkWhichSprintIsActive(val).id
      this.getAllTasks(sprintId);
    }))
  }

  checkWhichSprintIsActive(sprints): Sprint {
    sprints.forEach(e => {
      if (e.active == true) {
        this.sprint = e
        return
      }
    })

    console.log(this.sprint)
    return this.sprint
  }

  ngOnInit(): void {
    this.getAllSprints()
    console.log('HEJ TABLE')
  }

}
