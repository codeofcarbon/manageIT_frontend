import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private url = 'http://localhost:8080/api/v1/sprints'
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

  updateToActive(id: number): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.url}/${id}`, this.httpOptions)
  }

  changeToNoActive(id: number): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.url}/finish/${id}`, this.httpOptions)
  }

  updateSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.url}`, sprint, this.httpOptions)
  }
}

export interface Sprint {
  id?: number
  name: string
  startDate: string
  endDate: string
  storyPointsToSpend: string,
  tasksIds: number[],
  active: boolean,
  users?: User[]
}
