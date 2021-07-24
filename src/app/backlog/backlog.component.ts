import { Component, OnInit } from '@angular/core';
import { Sprint, SprintService } from '../services/sprint.service';
import { Task } from '../services/task.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  sprints: Sprint[] = []
  actualSprint: Sprint


  constructor(private sprintService: SprintService) { }

  getAllSprints() {
     this.sprintService.getAllSprints().subscribe(val => {
       this.sprints = val
       this.sprints.forEach( e => console.log(e))
     })
  }

  ngOnInit(): void {
    this.getAllSprints()
  }

}
