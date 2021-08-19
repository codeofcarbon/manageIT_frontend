import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectService } from '../services/project.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticated: boolean = false
  userr: User
  allUserss: User[]
  selectedProject: Project
  userProjects: Project[]

  constructor(private userService: UserService ,private projectService: ProjectService, private router: Router) {
    const urlTable = this.router.url.split('/')
    console.log(urlTable)

    const isLogged = JSON.parse(localStorage.getItem('isLogged')).isLogged
    this.authenticated = isLogged

    console.log(this.authenticated)
    this.getAllUsers()
    this.getUser(urlTable[1])
  }
  
  getProjectFromEvent(project: Project) {
    this.selectedProject = project;
   }
   
  getAllUsers() {
    this.userService.getAllUsers().subscribe(val => {
      this.allUserss = val
      console.log(this.allUserss)
    })
  }
  
  getUser(username: string) {
    this.userService.getUserByUsername(username).subscribe(val => {
      this.userr = val
      this.getUserProjects(this.userr)
      console.log(this.userr)
    })
  }
  
  getUserProjects(user: User) {
    this.projectService.getAllProjects().subscribe(val => {
      this.userProjects = val.filter( e => e.owner.username == user.username )
      console.log(this.userr)
    })
  }

  selectProject(id: number) {
    this.projectService.getProjectById(id).subscribe(val => {
             this.selectedProject = val
             console.log(this.selectedProject)
    })
  }

  ngOnInit(): void {
  }

}
