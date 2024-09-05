import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
  
  }

  getUser(): void {

    //retrieved data from localStorage + parses the object
    const user = JSON.parse(localStorage.getItem('user') as string);
    console.log(user, "Parsed JSON Object");

    // helps with error handling with if/else statement
    if(user) {

      // setting username from the parsed object to the "this.userData.Username"
      this.userData.Username = user.Username;
      console.log(this.userData.Username, "My Username");
    
      //collecting the user data from the API
      this.fetchApiData.getUser(this.userData.Username).subscribe((resp: any) => {
        this.userData = resp;
        console.log("I was called", this.userData.Username)
      
      });
    
    } else {
      // error handler
      console.error('No data in localStorage found');
    }

}



  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((result) => {
      // localStorage.setItem('user', JSON.stringify(result));
      this.dialogRef.close();
      this.snackBar.open(result, 'User Info Updated Successfully', {
        duration: 200
      });
      console.log(this.userData.Username);
      this.getUser();
    }, (error) => {
      this.snackBar.open('Error with updating user info: ' + error, 'OK', { 
        duration: 2000
      });
    });
  }
}

