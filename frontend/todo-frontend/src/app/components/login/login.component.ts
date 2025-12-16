import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  isRegisterMode = signal(false);
  errorMessage = signal('');
  isLoading = signal(false);

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode(): void {
    this.isRegisterMode.update((v) => !v);
    this.errorMessage.set('');
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage.set('Bitte alle Felder ausfüllen');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    if (this.isRegisterMode()) {
      this.apiService.register(this.username, this.password).subscribe({
        next: (response) => {
          if (response.ok) {
            // Nach erfolgreicher Registrierung automatisch einloggen
            this.login();
          } else {
            this.errorMessage.set(
              response.error || 'Registrierung fehlgeschlagen'
            );
            this.isLoading.set(false);
          }
        },
        error: () => {
          this.errorMessage.set('Ein Fehler ist aufgetreten');
          this.isLoading.set(false);
        },
      });
    } else {
      this.login();
    }
  }

  private login(): void {
    this.apiService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.access_token) {
          this.authService.setToken(response.access_token);
          this.router.navigate(['/todos']);
        } else {
          this.errorMessage.set(response.error || 'Login fehlgeschlagen');
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Ein Fehler ist aufgetreten');
        this.isLoading.set(false);
      },
    });
  }
}
