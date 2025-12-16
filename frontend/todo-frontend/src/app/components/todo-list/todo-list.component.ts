import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todos = signal<Todo[]>([]);
  newTodoTitle = '';
  isLoading = signal(true);
  isAdding = signal(false);

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading.set(true);
    this.apiService.getTodos().subscribe({
      next: (todos) => {
        this.todos.set(todos);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;

    this.isAdding.set(true);
    this.apiService.createTodo({ title: this.newTodoTitle.trim() }).subscribe({
      next: (todo) => {
        this.todos.update((todos) => [...todos, todo]);
        this.newTodoTitle = '';
        this.isAdding.set(false);
      },
      error: () => {
        this.isAdding.set(false);
      },
    });
  }

  toggleTodo(todo: Todo): void {
    this.apiService.updateTodo(todo.id, !todo.done).subscribe({
      next: (updatedTodo) => {
        this.todos.update((todos) =>
          todos.map((t) => (t.id === todo.id ? updatedTodo : t))
        );
      },
    });
  }

  deleteTodo(todo: Todo): void {
    this.apiService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.todos.update((todos) => todos.filter((t) => t.id !== todo.id));
      },
    });
  }

  get openTodos(): Todo[] {
    return this.todos().filter((t) => !t.done);
  }

  get completedTodos(): Todo[] {
    return this.todos().filter((t) => t.done);
  }

  logout(): void {
    this.authService.logout();
  }
}
