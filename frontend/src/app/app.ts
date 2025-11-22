// ...existing code...
import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Home } from './components/home/home';  
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , Home , Header , Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('frontend');

  ngOnInit() {
    // no inicializar librerías que usan `document` aquí
  }

  ngAfterViewInit() {
    if (typeof document === 'undefined') return;

    import('flowbite')
      .then(({ initFlowbite }) => {
        try {
          initFlowbite();
        } catch (e) {
          console.error('initFlowbite error:', e);
        }
      })
      .catch(err => console.error('Error cargando flowbite:', err));
  }

}
