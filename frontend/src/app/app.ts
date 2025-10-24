// ...existing code...
import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('frontend');

  ngOnInit() {
    // no inicializar librerías que usan `document` aquí
  }

  ngAfterViewInit() {
    // sólo en navegador
    if (typeof document === 'undefined') return;

    // import dinámico y seguro para evitar problemas en entornos no-browser
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
// ...existing code...