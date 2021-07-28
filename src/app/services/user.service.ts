import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private url = 'http://localhost:8080/api/v1/users'
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`)
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, user, this.httpOptions)
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.httpOptions)
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}`, user, this.httpOptions)
  }
}

export interface User {
  id?: number
  username: string
  password: string
}
