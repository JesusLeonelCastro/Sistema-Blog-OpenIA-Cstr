import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly apiUrl = 'http://localhost:3907/api';

  constructor(private httpClient: HttpClient) {}

  listArticles(page = 1): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.httpClient.get(`${this.apiUrl}/article/list/${page}`, { headers } as any);
  }

  saveArticle(payload: any): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.httpClient.post(`${this.apiUrl}/article/save`, payload, { headers });
  }

  listByUser(userId: string, page = 1): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.httpClient.get(`${this.apiUrl}/article/by-user/${userId}/${page}`, { headers } as any);
  }

  updateArticle(id: string, data: any) {
    const token = localStorage.getItem('token') ?? '';
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    // backend espera { id, title, content, summary } en body segun tu controlador
    return this.httpClient.put(`${this.apiUrl}/article/update`, { id, ...data }, { headers } as any);
  }


}