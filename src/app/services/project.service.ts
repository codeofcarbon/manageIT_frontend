import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from './sprint.service';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  //TODO - przeniesc wiekszosc czesc url do osobnej klasy i potem eskportowac 
  private url = 'http://localhost:8080/api/v1/projects'
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url)
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}/${id}`)
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project, this.httpOptions)
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.url, project, this.httpOptions)
  }
}

export interface Project {
  id: number
  name: string
  description: string,
  owner: User,
  sprints: Sprint[]
}
