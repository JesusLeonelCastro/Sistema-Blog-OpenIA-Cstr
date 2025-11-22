// ...existing code...
import { Component , OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserInterface } from '../../interface/user.interface';
import { Header } from "../header/header";
import { Footer } from '../footer/footer';
import { isPlatformBrowser } from '@angular/common'; 
import { inject, PLATFORM_ID } from '@angular/core'; 

@Component({
  selector: 'app-users',
  imports: [ Header , Footer ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users  implements OnInit{

  userlist : UserInterface[] = [];
  profile: any = null;
  private platformId = inject(PLATFORM_ID);

  constructor(private UserService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getUsers();
    this.loadProfile();
  }

  getUsers(){ 
    this.UserService.listUsers().subscribe({
      next: (result) => {
        this.userlist = result.users ?? result;
        try { this.cdr.detectChanges(); } catch(e) { /* noop */ }
      }, error: (error) => {
        console.error('Hubo un error al obtener los usuarios:', error);
        try { this.cdr.detectChanges(); } catch(e) { /* noop */ }
      }
    });
  }

  private loadProfile(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const stored = localStorage.getItem('user');
    if (!stored) return;

    const userId = JSON.parse(stored)?._id;
    if (!userId) return;

    this.UserService.getUserProfile(userId).subscribe({
      next: result => {
        this.profile = result.user ?? result;
        try { this.cdr.detectChanges(); } catch(e) { /* noop */ }
      },
      error: error => {
        console.error('Hubo un error al obtener el perfil del usuario:', error);
        try { this.cdr.detectChanges(); } catch(e) { /* noop */ }
      }
    });
  }
}
// ...existing code...