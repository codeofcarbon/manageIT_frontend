import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private url = 'http://localhost:8000/api/v1/sprints'
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getAllSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.url)
  }

  getSprintById(id: number): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.url}/${id}`)
  }

  addSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.url, sprint, this.httpOptions)
  }

  deleteSprint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  updateSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(this.url, sprint, this.httpOptions)
  }
}

export interface Sprint {
  id?: number
  name: string
  startDate: string
  endDate: string
  storyPointsToSpend: string,
  tasksIds: number[]
}
