import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrls: ['./vertical-navbar.component.css']
})
export class VerticalNavbarComponent implements OnInit, OnChanges {

  @Input() user
  @Input() project

  constructor(private router: Router) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.router.navigateByUrl(`/${this.user.username}/${this.project.id}/backlog`)
    console.log(changes)
  }
  
  ngOnInit(): void {
    console.log(this.project)
  }

}
