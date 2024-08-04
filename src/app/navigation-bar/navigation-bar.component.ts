import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(private router: Router) { } 

  userLogout(): void {
    localStorage.removeItem('token');
    console.log('user successfully logged out');
    this.router.navigate(['welcome']);

  }
  

}
