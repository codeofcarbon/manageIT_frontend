import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrls: ['./vertical-navbar.component.css']
})
export class VerticalNavbarComponent implements OnInit {

  @Input() user

  constructor() {
  }
  
  ngOnInit(): void {
    
  }

}
