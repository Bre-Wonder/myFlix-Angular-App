import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component that displays director information in a dialog.
 */

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss'
})

export class DirectorInfoComponent implements OnInit {

 /**
   * Creates an instance of DirectorInfoComponent.
   * 
   * @param dialogRef - Reference to the open dialog instance.
   * @param snackBar - Service to display snack bar notifications.
   * @param fetchApiData - Service used to fetch director data from the API.
   * @param data - Injected data containing details about the director.
   */

  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) 
    public data: {
      director: string;
      bio: string;
      birth: string;
      death: string;
    }
  ) { }

  /**
   * Lifecycle hook that gets called once the component is initialized.
   */

  ngOnInit() : void {  
  }

  /**
   * Fetches director information from the API and handles dialog closure and notifications.
   */

  getDirector() : void {
    this.fetchApiData.getDirector(this.data.director).subscribe((response) => {
      this.dialogRef.close();
      console.log(response);
      
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}