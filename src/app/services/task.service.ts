import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'http://localhost:8000/api/v1/tasks'
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url)
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}/${id}`)
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task, this.httpOptions)
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/1`, task, this.httpOptions)
  }
}

export interface Task {
  id?: number
  name: string
  description: string
  storyPoints: string
  progress: string
  priority: string
  sprintId: number
}
