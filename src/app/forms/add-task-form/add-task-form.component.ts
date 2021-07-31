import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BacklogComponent } from 'src/app/routes/backlog/backlog.component';
import { Task, TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent extends TaskFormComponent implements OnInit {


  constructor(private backlogComp: BacklogComponent,private taskService: TaskService, private route: ActivatedRoute, private location: Location) {
    super()
    this.route.params.subscribe(params => {
      this.params = params
      this.getSprintId()
    }
    )
  }

  saveTask(task: Task) {
          this.taskService.addTask(task).subscribe(val => {
            console.log(val)
            console.log('---- New task added ----')
            document.getElementById('close-button').click()
            // window.location.reload()
            this.location.go('/backlog')
            this.backlogComp.getAllSprints()
            this.backlogComp.getAllTasks()
          })
  }

  getSprintId() {
    this.taskForm.setValue({
      id: null,
      name: null,
      description: null,
      storyPoints: 0,
      progress: 'TO_DO',
      priority: '1',
      sprint: {
        id: this.params.id
      },
    })
  }

  ngOnInit(): void {
  }

}
