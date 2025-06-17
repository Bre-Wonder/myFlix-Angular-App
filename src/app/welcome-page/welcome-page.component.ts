import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * The WelcomePageComponent serves as the landing page for the application.
 * It provides buttons to open registration and login dialogs using Angular Material Dialog.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {
  
  /**
   * Creates an instance of WelcomePageComponent.
   * 
   * @param dialog Angular Material Dialog service used to open registration and login dialogs.
   */
  constructor(public dialog: MatDialog) { }
  
  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
  }

  /**
   * Opens the registration dialog with a predefined width when the sign up button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
    //Assigning the dialog a width
    width: '280px'
    });
  }

  /**
   * Opens the login dialog with a predefined width when login button is clicked.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
    width: '280px'
    });
  }

}
