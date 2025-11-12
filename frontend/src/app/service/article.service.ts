import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly apiUrl = 'http://localhost:3907/api';

  constructor(private httpClient: HttpClient) {}

  listArticles(page = 1): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/article/list/${page}`);
  }


}