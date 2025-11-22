import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router, ParamMap } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-updatearticle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Header, Footer],
  templateUrl: './updatearticle.html',
  styleUrls: ['./updatearticle.css'],
})
export class Updatearticle implements OnInit {
  form!: FormGroup;
  loading = false;
  saving = false;
  articleId: string | null = null;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
  }

  submit() {
    if (!this.articleId) {
      this.error = 'Id de artículo no definido.';
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = '';
    this.success = '';

    const payload = this.form.value;
    this.articleService.updateArticle(this.articleId, payload).subscribe({
      next: (res: any) => {
        this.success = res?.message ?? 'Artículo actualizado correctamente';
        this.saving = false;
        try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
        this.router.navigate(['/myarticles']);
      },
      error: (err: any) => {
        console.error('Error actualizando artículo:', err);
        this.error = err?.error?.message ?? err?.message ?? 'Error al actualizar';
        this.saving = false;
        try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
      }
    });
  }
}