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
    public snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {

  }

  updateUser(): void {
    this.fetchApiData.updateUser(this.userData.Username, this.userData).subscribe((result) => {

      this.dialogRef.close();
      this.snackBar.open(result, 'User Info Updated Successfully', {
        duration: 200
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', { 
        duration: 2000
      });
    });
  }
}
