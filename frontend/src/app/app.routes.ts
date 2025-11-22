import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Create } from './components/create/create';
import { Users } from './components/users/users';
import { authGuard } from './guards/auth.guard';
import { Profile } from './components/profile/profile';
import { Update } from './components/update/update';
import { Articles } from './components/article/article';
import { Createarticle } from './components/createarticle/createarticle';
import { Articleprofile } from './components/articleprofile/articleprofile';
import { Updatearticle } from './components/updatearticle/updatearticle';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
   
  { path: 'login', component: Login },
  { path: 'create', component: Create  },

  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'users', component: Users, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'update', component: Update, canActivate: [authGuard] },
  { path: 'article', component: Articles, canActivate: [authGuard] },
  { path: 'createarticle', component: Createarticle, canActivate: [authGuard] },
  { path: 'myarticles', component: Articleprofile, canActivate: [authGuard] },
  { path: 'updatearticle', component: Updatearticle, canActivate: [authGuard] },


  { path: '**', redirectTo: 'login' },

];