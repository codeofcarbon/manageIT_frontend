import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BacklogComponent } from 'src/app/routes/backlog/backlog.component';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {

  params;
  taskForm: FormGroup = new FormGroup({
    id: new FormControl('', { validators: [], updateOn: 'change' }),
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(55)], updateOn: "change" }),
    description: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)], updateOn: "change" }),
    storyPoints: new FormControl('', { validators: [Validators.max(10)], updateOn: "change" }),
    progress: new FormControl("TO_DO", { validators: [Validators.required], updateOn: "change" }),
    priority: new FormControl('', { validators: [Validators.min(1), Validators.max(5)], updateOn: "change" }),
    sprint: new FormGroup({
      id: new FormControl('', { validators: [Validators.required], updateOn: "change" })
    })
  }
  )

  constructor(private backlogComp: BacklogComponent,private taskService: TaskService, private route: ActivatedRoute, private location: Location) {
    this.route.params.subscribe(params => {
      this.params = params
      this.getSprintId()
    }
    )
  }

  saveTask(task: Task) {
          this.taskService.addTask(task).subscribe(val => {
            console.log('---- New task added ----')
            console.log(val)
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
      priority: null,
      sprint: {
        id: this.params.id
      },
    })

  }

  ngOnInit(): void {
  }

}
