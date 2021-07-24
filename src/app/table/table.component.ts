import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Sprint, SprintService } from '../services/sprint.service';
import { Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  public sprint: Sprint =  {
    id: 1,
    name: 'spritn1',
    startDate: '3012983',
    endDate: '23204823',
    storyPointsToSpend: '34',
    tasksIds: []
  };
    
  public selectedTask 
  public tasksInSprint: Task[]
  public toDo: Task[] = []
  public inProgress: Task[] = []
  public done: Task[] = []
  public counter = 0;

  constructor(private taskService: TaskService, private sprintService: SprintService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ZMIANY W TABLE TABLE')
  }

  checkProgress(task: Task) {

    // console.log(task)
     
    if(task.progress === 'TO_DO') {
      this.toDo.push(task)
      return
    }

    if(task.progress === 'IN_PROGRESS') {
      this.inProgress.push(task)
      return
    }

    if(task.progress === 'DONE') {
      this.done.push(task)
      return
    }
  }

  getAllTasks() {
      this.taskService.getAllTasks().subscribe(val => {
        this.tasksInSprint = val
        this.tasksInSprint = this.tasksInSprint.filter( e => e.sprintId == this.sprint.id)
        this.tasksInSprint.forEach(e => this.checkProgress(e))
      })
  }

  getAllSprints() {
      this.sprintService.getAllSprints().subscribe((val => this.sprint = val[0]))
  }

  ngOnInit(): void {
    this.getAllSprints()
    this.getAllTasks()
    console.log('HEJ TABLE')
  }

}
