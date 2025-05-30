import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  router = inject(Router);
  authService = inject(Auth);
  register() {
    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        alert('Register successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Register failed', error);
      },
    });
  }
}
