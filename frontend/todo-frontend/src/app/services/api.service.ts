import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodoCreate } from '../models/todo.model';
import { LoginResponse, RegisterResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Auth
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
      {}
    );
  }

  register(username: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/register?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
      {}
    );
  }

  // Todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`, {
      headers: this.getAuthHeaders(),
    });
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/todos/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createTodo(todo: TodoCreate): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}/todos`, todo, {
      headers: this.getAuthHeaders(),
    });
  }

  updateTodo(id: number, done: boolean): Observable<Todo> {
    return this.http.patch<Todo>(
      `${this.baseUrl}/todos/${id}`,
      { done },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  deleteTodo(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.baseUrl}/todos/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
