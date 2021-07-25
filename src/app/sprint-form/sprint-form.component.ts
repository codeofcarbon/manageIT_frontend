import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Sprint, SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent implements OnInit {

  private params
  public sprint: Sprint
  public sprintForm: FormGroup = new FormGroup({
    id: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(55)], updateOn: 'change' }),
    startDate: new FormControl('', { validators: [], updateOn: 'change' }),
    endDate: new FormControl('', { validators: [], updateOn: 'change' }),
    storyPointsToSpend: new FormControl('', { validators: [Validators.min(0), Validators.max(50)], updateOn: 'change' })
  })

  constructor(private sprintService: SprintService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.params = params
      console.log(params)
      this.getSprint()
    })
  }

  updateSprint(sprint: Sprint) {
    this.sprintService.updateSprint(sprint).subscribe(val => {
      this.sprint = val
      console.log(this.sprint)
      this.getSprint()
    })
  }

  getSprint() {
    this.sprintService.getSprintById(this.params.id).subscribe(val => {
      this.sprint = val

      var momentStartDate = null
      var momentEndDate = null
      var isoStartDate = null
      var isoEndDate = null

      if(this.sprint.startDate != null) {
        momentStartDate = moment(this.sprint.startDate)
        momentEndDate = moment(this.sprint.endDate)
        isoStartDate = momentStartDate.toDate().toISOString()
        isoEndDate = momentEndDate.toDate().toISOString()
        console.log(isoStartDate)
        console.log(isoEndDate)
      }

      console.log(val)
      this.sprintForm.setValue({
        id: this.sprint.id,
        name: this.sprint.name,
        startDate: isoStartDate != null ? isoStartDate : null,
        endDate: isoEndDate != null ? isoEndDate : null,
        storyPointsToSpend: this.sprint.storyPointsToSpend
      })
    })
  }

  ngOnInit(): void {
    // this.getSprint()
  }

}
