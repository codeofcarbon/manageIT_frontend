import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = null
  userForm: FormGroup = this.fb.group({
    username: this.fb.control(''),
    password: this.fb.control('')
  })

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

  registerNewUserAndLogin(user: User) {
    this.userService.addUser(user).subscribe(val => {
      this.user = val
      console.log(user)
      this.router.navigateByUrl(`/${user.username}/1/table`)
    }, err => console.log(err.error.message)
    )
  }

  ngOnInit(): void {
  }
}
