import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL: string = 'http://localhost:3907/api/user/listusers';
  constructor( private httpClient: HttpClient) { }

  getusers() : Observable <any> {
    return this.httpClient.get(this.API_URL).pipe(res => res);
  }
  
}
