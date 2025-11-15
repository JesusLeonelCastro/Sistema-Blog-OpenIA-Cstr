import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Articles } from '../article/article';

@Component({
  selector: 'app-createarticle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Header, Footer], // <-- añadir RouterModule
  templateUrl: './createarticle.html',
  styleUrls: ['./createarticle.css'],
})
export class Createarticle implements OnInit {
  form!: FormGroup;
  submitting = false;
  error = '';

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      summary: [''],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = '';

    const payload = { ...this.form.value };
    this.articleService.saveArticle(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigateByUrl('/article');
      },
      error: err => {
        this.submitting = false;
        console.error('save article error:', err);
        this.error = err.error?.message ?? err.message ?? 'No se pudo guardar el artículo';
      }
    });
  }
}