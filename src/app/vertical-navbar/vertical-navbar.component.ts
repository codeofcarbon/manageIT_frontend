import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrls: ['./vertical-navbar.component.css']
})
export class VerticalNavbarComponent implements OnInit {

  @Input() user
  @Input() project

  constructor() {
  }
  
  ngOnInit(): void {
    console.log(this.project)
  }

}
