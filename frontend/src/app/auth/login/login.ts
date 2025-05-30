import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = {
    email: '',
    password: '',
  };
  storedUser = {
    email: 'test@gmail.com',
    password: 'password123',
  };

  loginValid: boolean = true;
  router = inject(Router);

  validateLogin(email: string, password: string): boolean {
    return (
      email === this.storedUser.email && password === this.storedUser.password
    );
  }

  login() {
    if (this.validateLogin(this.user.email, this.user.password)) {
      localStorage.setItem('loggedInUser', JSON.stringify(this.user.email));
      this.loginValid = true;
      this.router.navigate(['/dashboard']);
    } else {
      this.loginValid = false;
    }
  }
}
