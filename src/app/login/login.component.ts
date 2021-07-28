import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  allUsers: User[]
  user: User = null
  userForm: FormGroup = this.fb.group({
    id: this.fb.control(''),
    username: this.fb.control(''),
    password: this.fb.control('')
  })

  constructor(private userService: UserService, private fb: FormBuilder) { }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(val => {
      this.allUsers = val
    })
  }

  login(user: User) {
    this.userService.login(user).subscribe(val => {
      this.user = val
      console.log(user)
    }, err => console.log(err.error.message)
    )
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

}
