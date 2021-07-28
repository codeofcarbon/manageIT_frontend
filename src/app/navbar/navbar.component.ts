import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private projectService: ProjectService) { }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(val => {
      this.projects = val.filter( e => e.ownerId == this.user.id )
    })
  }

  ngOnInit(): void {
    this.getAllProjects()
  }

}
