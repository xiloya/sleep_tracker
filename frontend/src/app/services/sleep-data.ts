import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface SleepEntry {
  _id?: string;
  userId: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class SleepDataService {
  private apiUrl = environment.apiUrl + '/sleepdata';

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getUserSleepData(userId: string): Observable<SleepEntry[]> {
    return this.http.get<SleepEntry[]>(`${this.apiUrl}/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createSleepData(data: {
    userId: string;
    date: string;
    sleepTime: string;
    wakeTime: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data, {
      headers: this.getAuthHeaders(),
    });
  }
}
