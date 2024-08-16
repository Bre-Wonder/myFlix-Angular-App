import { Component, OnInit, Input } from '@angular/core';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss']
})
export class UserProfileViewComponent implements OnInit{

  @Input() userData = { Username: 'TestUser', Password: '', Email: '', Birthday: '' };

  user: any = {};

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    console.log("Init before get user");
    this.getUser();
  }

  

//Come back to this function, it is not working...
  getUser(): void {

    //retrieved data from localStorage
    const localStorageUser = localStorage.getItem('user');

    // since I am writing in Typescript, I need to have a check to make sure localStorageUser is not null
    if(localStorageUser) {
      console.log("Before", localStorageUser, "I'm the object");

      //sets the JSON parsed object equal to variable "user"
      const user = JSON.parse(localStorageUser);
      console.log(user, "Parsed JSON Object");

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
    
   //Function opens up dialog when the update button is pressed in the user profile view
   openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserComponent, {
    width: '280px'
    });
  }

  //Delete User from localStorage
  deleteUser(): void {
    localStorage.removeItem('user');
    console.log('User Deleted');
    this.router.navigate(['welcome']);
  }

}