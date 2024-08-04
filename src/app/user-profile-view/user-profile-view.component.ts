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

  user: any = {};

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  

//Come back to this function, it is not working...
  getUser(): void {
    this.fetchApiData.getUser(this.user.Username).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        // return this.user;
      });
    }
   //Function opens up dialog when the update button is pressed in the user profile view
   openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserComponent, {
    width: '280px'
    });
  }

}

//To use as a guide
// @Inject(MAT_DIALOG_DATA) 
//     public data: {
//       director: string;
//       bio: string;
//       birth: string;
//       death: string;
//     }