import { Component } from '@angular/core';
import { User, UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ManageIT-front-end';
  allUsers: User[];

  constructor(private userService: UserService) {
         this.getAllUsers()
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(val => {
          this.allUsers = val
    })
  }
}


