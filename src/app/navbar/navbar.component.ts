import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project, ProjectService } from '../services/project.service';
import { User, UserService } from '../services/user.service';

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

  constructor(private projectService: ProjectService, private userService: UserService) { }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(val => {
      this.projects = val.filter( e => e.owner.username == this.user.username )
      // if(this.selectedProject == null) {
      //   this.selectProject(this.projects[0].id)
      // }

      console.log(this.allUsers)
      console.log(this.user)
    })
  }

  selectProject(id: number) {
    this.projectService.getProjectById(id).subscribe(val => {
             this.selectedProject = val
             this.projectEmitter.emit(val)
             console.log(this.projectEmitter)
    })
  }

  goToHome() {
    this.selectedProject = null
    console.log('nulnul')
    this.projectEmitter.emit(null)
    this.ngOnInit()
  }

  logout() {
        this.userService.authenticated = false
        localStorage.removeItem('isLogged')
  }

  ngOnInit(): void {
    this.getAllProjects()
  }

}
