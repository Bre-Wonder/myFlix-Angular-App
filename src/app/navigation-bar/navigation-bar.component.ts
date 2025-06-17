import { Component } from '@angular/core';
import { Router } from '@angular/router';


/**
 * Navigation bar component that provides a user logout feature
 * and controls navigation to the welcome screen upon logout.
 *
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  /**
   * Creates an instance of NavigationBarComponent.
   *
   * @param router - Angular Router used for navigation after logout.
   */
  constructor(private router: Router) { } 

  /**
   * Logs out the current user by removing authentication data
   * from local storage and redirects to the 'welcome' route
   * after a short delay.
   */
  userLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('user successfully logged out');

    setTimeout(() => {
      this.router.navigate(['welcome']);
    }, 100);   

  }
  

}
