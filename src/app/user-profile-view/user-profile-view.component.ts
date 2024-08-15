import { Component, OnInit, Input } from '@angular/core';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss']
})
export class UserProfileViewComponent implements OnInit{

  @Input() userData = { Username: 'TestUser', Password: '', Email: '', Birthday: '' };

  // user: any = {};

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    ) { }

  ngOnInit(): void {
    console.log("Init before get user");
    this.getUser();
  }

  

//Come back to this function, it is not working...
  getUser(): void {
    const localStorageUser = localStorage.getItem('user');
      console.log("Before");
      console.log(localStorageUser, "I'm the object");
      console.log("After");
    // const user = JSON.parse(localStorageUser);
    // this.userData.Username = user.Username;
      console.log(this.userData.Username, "My Username");
    
    this.fetchApiData.getUser(this.userData.Username).subscribe((resp: any) => {
        this.userData = resp;
        console.log("I was called");
        console.log(this.userData.Username);
      });
    }
   //Function opens up dialog when the update button is pressed in the user profile view
   openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserComponent, {
    width: '280px'
    });
  }

  //Delete User from Database
  deleteUser(): void {
    console.log('This button was pressed');
  }

}