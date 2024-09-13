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
    localStorage.removeItem('user');
    console.log('user successfully logged out');

    setTimeout(() => {
      this.router.navigate(['welcome']);
    }, 100);   

  }
  

}
