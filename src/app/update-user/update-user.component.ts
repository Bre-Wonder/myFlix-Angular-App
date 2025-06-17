import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for updating user information.
 * Utilizes Angular Material Dialog for modal display,
 * and MatSnackBar for feedback messages.
 * 
 * @component
 */
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  /**
   * User data to be updated.
   * Expected to be passed from a parent component.
   * 
   * @type {{ Username: string; Password: string; Email: string; Birthday: string }}
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of UpdateUserComponent.
   * 
   * @param fetchApiData Service for API communication
   * @param dialogRef Reference to the opened dialog
   * @param snackBar Service for displaying feedback messages
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar,
  ) { }


  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
  
  }

  /**
   * Sends updated user data to the backend API and provides feedback.
   * Updates localStorage on success and closes the dialog.
   */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((result) => {
      console.log("API Result:", result);
      localStorage.setItem('user', JSON.stringify(result));
      this.dialogRef.close();
      this.snackBar.open(result, 'User Info Updated Successfully', {
        duration: 200
      });
      console.log("New Email:", this.userData.Email);
    }, (error) => {
      this.snackBar.open('Error with updating user info: ' + error, 'OK', { 
        duration: 2000
      });
    });
  }
}

