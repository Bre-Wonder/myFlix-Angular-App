import { Component, OnInit, Input } from '@angular/core';

//Closes dialog on success of user registration
import { MatDialogRef } from '@angular/material/dialog';

//Brings in API calls
import { FetchApiDataService } from '../fetch-api-data.service';

//Disiplay notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
}

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
