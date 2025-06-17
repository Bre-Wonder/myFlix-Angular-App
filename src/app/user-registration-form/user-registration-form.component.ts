import { Component, OnInit, Input } from '@angular/core';

/** Closes dialog on success of user registration */
import { MatDialogRef } from '@angular/material/dialog';

/** Brings in API calls */
import { FetchApiDataService } from '../fetch-api-data.service';

/** Disiplay notifications back to user */
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for the user registration form.
 * Handles user input, sends registration data to the API,
 * and displays success or error messages to the user.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  /**
   * Object containing user input data from the form.
   * @property {string} Username - The user's username.
   * @property {string} Password - The user's password.
   * @property {string} Email - The user's email address.
   * @property {string} Birthday - The user's birth date.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * 
   * @param fetchApiData Service for performing API calls related to user registration.
   * @param dialogRef Reference to the registration dialog, allowing it to be closed.
   * @param snackBar Service to display messages to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Angular lifecycle hook that runs after component initialization.
   */
  ngOnInit(): void {
}

  /**
   * Sends the registration form data to the backend API.
   * On success, closes the dialog and shows a success message.
   */
  //Send the inputs from the form to the back end
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('You Registered Successfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', { 
        duration: 2000    
      });
    });
  }

}
