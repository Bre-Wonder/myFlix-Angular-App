import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

//brings in API call from ts file
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

/**
 * Component for handling user login via a modal dialog.
 * Uses Angular Material components for dialog and snackbar feedback.
 * 
 * @component
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent  implements OnInit {

  /**
   * Object containing login credentials entered by the user.
   * 
   * @type {{ Username: string; Password: string }}
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Initializes the UserLoginFormComponent.
   * 
   * @param fetchApiData Service for API requests
   * @param dialogRef Reference to the opened modal dialog
   * @param snackBar Service for displaying notifications
   * @param router Angular Router for navigation after login
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Lifecycle hook triggered after component's data-bound properties are initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Performs login using provided user credentials.
   * If successful, stores user and token in localStorage,
   * shows a success message, closes the dialog, and navigates to the movie list.
   * If unsuccessful, displays an error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      //handle successful login here
      this.dialogRef.close();
      this.snackBar.open('You Logged in Successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (error) => {
      console.log(error);
      this.snackBar.open('Login Unsuccessful ' + error.message, 'OK', {
        duration: 2000
      });
    });
  }
}
