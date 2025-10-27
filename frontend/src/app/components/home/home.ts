import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import { UserInterface } from '../../interface/user.interface';

@Component({
  selector: 'app-home',
  imports: [],
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
    this.UserService.getusers().subscribe({
      next: (result) => {
        this.userlist = result.users;
        console.log(this.userlist);


      }, error: (error) => {
        console.error('Hubo un error al obtener los usuarios:', error);
      }
    });
  }
}
