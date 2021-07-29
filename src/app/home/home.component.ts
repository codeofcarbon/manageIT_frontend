import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userr
  allUserss
  selectedProject

  constructor(private userService: UserService, private router: Router) {
    const urlTable = this.router.url.split('/')
    console.log(urlTable)
    
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
      console.log(this.userr)
    })
  }

  ngOnInit(): void {
  }

}
