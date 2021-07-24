import { Component } from '@angular/core';
import { Task } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ManageIT-front-end';
  task = null;

  getSelectedTask(taskFromEmit: Task) {
    this.task = taskFromEmit;
}
}


