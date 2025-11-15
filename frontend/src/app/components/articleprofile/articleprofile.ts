import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-articleprofile',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './articleprofile.html',
  styleUrls: ['./articleprofile.css']
})
export class Articleprofile implements OnInit {
  articles: any[] = [];
  page = 1;
  itemsPerPage = 10;
  total = 0;
  loading = false;
  userId = '';

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    console.log('stored user raw:', stored);
    this.userId = stored ? (JSON.parse(stored)._id ?? JSON.parse(stored).id ?? '') : '';
    console.log('userId used to request articles:', this.userId);

    if (this.userId) {
      this.load(); // <-- llamar aqui
    } else {
      console.warn('No userId disponible para listar artículos');
    }
  }

  load(): void {
  this.loading = true;
  this.articleService.listByUser(this.userId, this.page).subscribe({
    next: (res) => {
      console.log('listByUser response:', res);
      // adapta a la estructura que devuelve tu backend
      this.articles = res.articles ?? res.docs ?? [];
      this.total = res.total ?? res.totalDocs ?? 0;
      this.itemsPerPage = res.itemsPerPage ?? res.limit ?? 10;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error al listar artículos byUser:', err);
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