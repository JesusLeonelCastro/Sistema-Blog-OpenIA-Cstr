import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './article.html',
  styleUrls: ['./article.css'],
})
export class Articles implements OnInit {
  articles: any[] = [];
  page = 1;
  itemsPerPage = 10;
  total = 0;
  pages = 1;
  loading = false;
  error = '';

  constructor(private articleService: ArticleService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.articleService.listArticles(this.page).subscribe({
      next: (res) => {
        console.log('listArticles response:', res);
        this.articles = res.articles ?? res.docs ?? [];
        this.total = res.total ?? res.totalDocs ?? 0;
        this.itemsPerPage = res.itemsPerPage ?? res.limit ?? this.itemsPerPage;
        this.pages = Math.max(1, Math.ceil(this.total / this.itemsPerPage));
        this.loading = false;

        // FORZAR detección de cambios para que el template se actualice inmediatamente
        try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
      },
      error: (err) => {
        console.error('Error list articles', err);
        this.error = err.error?.message ?? err.message ?? 'Error al cargar artículos';
        this.loading = false;
        try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
      }
    });
  }

  next(): void {
    if (this.page * this.itemsPerPage < this.total) {
      this.page++;
      this.load();
    }
  }

  prev(): void {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }
}
