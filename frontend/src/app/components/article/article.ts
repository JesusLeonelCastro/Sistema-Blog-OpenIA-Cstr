import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { Footer } from "../footer/footer";
import { Header } from '../header/header';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [Footer, Header , RouterModule],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Articles implements OnInit {
  articles: any[] = [];
  page = 1;
  itemsPerPage = 10;
  total = 0;
  loading = false;
  error = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.articleService.listArticles(this.page).subscribe({
      next: (res) => {
        this.articles = res.articles ?? [];
        this.total = res.total ?? 0;
        this.itemsPerPage = res.itemsPerPage ?? this.itemsPerPage;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error list articles', err);
        this.error = err.error?.message ?? err.message ?? 'Error al cargar artículos';
        this.loading = false;
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