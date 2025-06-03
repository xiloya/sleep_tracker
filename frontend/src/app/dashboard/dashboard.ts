import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { SleepDataService } from '../services/sleep-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTimepickerModule,
    MatToolbarModule,
    MatMenuModule,
  ],
})
export class Dashboard implements OnInit {
  showForm = false;
  columns = ['date', 'sleep', 'wake', 'duration'];
  dataSource: any[] = [];

  userFirstName: string | null = '';
  userId: string | null = '';

  date = new Date();
  sleepTime: Date | null = null;
  wakeTime: Date | null = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private sleepDataService: SleepDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const userData = this.auth.getUser();
    if (userData) {
      this.userFirstName = userData.firstName;
      this.userId = userData.userId;
      this.loadUserSleepData();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadUserSleepData() {
    if (!this.userId) return;
    this.sleepDataService.getUserSleepData(this.userId).subscribe({
      next: (data) => {
        this.dataSource = data.map((entry) => ({
          date: new Date(entry.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          sleep: this.formatTime(new Date(entry.sleepTime)),
          wake: this.formatTime(new Date(entry.wakeTime)),
          duration: `${entry.duration} HRS`,
        }));
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load sleep data', err);
      },
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      const now = new Date();
      this.sleepTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        0
      );
      this.wakeTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        7,
        0
      );
    }
  }

  addEntry() {
    if (!this.sleepTime || !this.wakeTime || !this.userId) return;

    const body = {
      userId: this.userId,
      date: this.date.toISOString(),
      sleepTime: this.sleepTime.toISOString(),
      wakeTime: this.wakeTime.toISOString(),
    };

    this.sleepDataService.createSleepData(body).subscribe({
      next: () => {
        this.loadUserSleepData();
        this.date = new Date();
        this.sleepTime = null;
        this.wakeTime = null;
        this.showForm = false;
      },
      error: (err) => {
        console.error('Failed to save sleep data', err);
      },
    });
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
