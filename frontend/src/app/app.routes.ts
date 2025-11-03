import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Create } from './components/create/create';
import { Users } from './components/users/users';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
   
  { path: 'login', component: Login },
  { path: 'create', component: Create  },

  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'users', component: Users, canActivate: [authGuard] }, 

  { path: '**', redirectTo: 'login' },

];