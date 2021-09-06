import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent implements OnInit {

  projectId: number
  params = null;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.params = params)
  }

  ngOnInit(): void {
  }

}
