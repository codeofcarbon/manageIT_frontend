import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BacklogComponent } from '../routes/backlog/backlog.component';
import { Project, ProjectService } from '../services/project.service';
import { User } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() allUsers: User[]
  @Input() user: User
  projects: Project[]
  @Output() projectEmitter: EventEmitter<Project> = new EventEmitter<Project>()
  selectedProject = null

  constructor(private projectService: ProjectService) { }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(val => {
      this.projects = val.filter( e => e.owner.id == this.user.id )
      if(this.selectedProject == null) {
        this.selectProject(this.projects[0].id)
    }
      console.log(this.allUsers)
      console.log(this.user)
    })
  }

  selectProject(id: number) {
    this.projectService.getProjectById(id).subscribe(val => {
             this.selectedProject = val
             this.projectEmitter.emit(val)
            //  this.backlogComp.getAllSprints()
            //  this.backlogComp.getAllTasks()
             console.log(this.projectEmitter)
    })
  }

  ngOnInit(): void {
    this.getAllProjects()
  }

}
