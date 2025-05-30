import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = {
    email: '',
    password: '',
  };

  loginValid: boolean = true;
  router = inject(Router);
  authService = inject(Auth);

  login() {
    console.log('Login attempt with:', this.user);
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.loginValid = true;
        this.router.navigate(['/dashboard']);
        console.log('Login successful', res);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loginValid = false;
      },
    });
  }
}
