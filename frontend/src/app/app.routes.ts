import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Create } from './components/create/create';
import { Users } from './components/users/users';

export const routes: Routes = [
  { path: '', component: Login },
   
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'create', component: Create },
  { path: 'users', component: Users },
 

  { path: '**', redirectTo: '' },

];