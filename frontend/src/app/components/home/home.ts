import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserInterface } from '../../interface/user.interface';
import { Header } from "../header/header";
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header , Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home  implements OnInit{

  userlist : UserInterface[] = [];

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
}
