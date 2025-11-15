import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly apiUrl = 'http://localhost:3907/api';

  constructor(private httpClient: HttpClient) {}

  listArticles(page = 1): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/article/list/${page}`);
  }

  saveArticle(payload: any): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.httpClient.post(`${this.apiUrl}/article/save`, payload, { headers });
  }


}