import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environments';

interface TokenPayload {
  userId: string;
  firstName: string;
}
@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}
  private url = environment.apiUrl + '/auth';
  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password });
  }
  register(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.url}/register`, user);
  }

  getUser(): TokenPayload | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded;
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}
