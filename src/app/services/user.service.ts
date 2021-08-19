import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  authenticated: boolean = false;
  private url = 'http://localhost:8080/api/v1/users'
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}/by/${username}`)
  }

  authenticate(username, password): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json', 
                                 'Authorization': 'Basic ' + btoa(`${username}:${password}`) })
    }
    return this.http.get<User>(`${this.url}/authenticate`, this.httpOptions)
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.httpOptions)
  }
}

export interface User {
  username: string
  password: string
}
