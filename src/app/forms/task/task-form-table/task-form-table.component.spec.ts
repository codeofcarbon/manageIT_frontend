import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormTableComponent } from './task-form-table.component';

describe('TaskFormTableComponent', () => {
  let component: TaskFormTableComponent;
  let fixture: ComponentFixture<TaskFormTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFormTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
