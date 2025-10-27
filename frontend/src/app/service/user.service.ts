import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = 'http://localhost:3907/api';

  constructor(private httpClient: HttpClient) {}

  listUsers(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/user/listusers`);
  }
}