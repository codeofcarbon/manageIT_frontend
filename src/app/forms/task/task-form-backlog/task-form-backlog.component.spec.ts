import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormBacklogComponent } from './task-form-backlog.component';

describe('TaskFormBacklogComponent', () => {
  let component: TaskFormBacklogComponent;
  let fixture: ComponentFixture<TaskFormBacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFormBacklogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
