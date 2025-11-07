import { Component , OnInit} from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserInterface } from '../../interface/user.interface';
import { Header } from "../header/header";
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-users',
  imports: [ Header , Footer ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

export class Users  implements OnInit{

  userlist : UserInterface[] = [];
  profile: any = null;

  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    this.getUsers();

     
  }

  getUsers(){ 
    this.UserService.listUsers().subscribe({
      next: (result) => {
        this.userlist = result.users;


      }, error: (error) => {
        console.error('Hubo un error al obtener los usuarios:', error);
      }
    });
  }

  getUserProfile(userId: number) {
    this.UserService.getUserProfile(userId).subscribe({
      next: (result) => {
        console.log('Perfil del usuario:', result);
      },
      error: (error) => {
        console.error('Hubo un error al obtener el perfil del usuario:', error);
      }
    });
  }
}