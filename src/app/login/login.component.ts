import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = null
  userForm: FormGroup = this.fb.group({
    username: this.fb.control(''),
    password: this.fb.control('')
  })

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
   }
  
  authorize(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log(localStorage.getItem('currentUser'))

    this.userService.authenticate(user.username, user.password).subscribe(val => {
      console.log(val)
      console.log(val.principal)
      this.user = val.principal
     
      const logged = {
        isLogged: true
      }

      localStorage.setItem('isLogged', JSON.stringify(logged))
      this.userService.authenticated = true
    
      this.router.navigateByUrl(`/${user.username}/null/table`)
    }, err => {
          console.log(err)
    })
  }

  ngOnInit(): void {
  }

}
