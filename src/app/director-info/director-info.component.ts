import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss'
})
export class DirectorInfoComponent implements OnInit {

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

  ngOnInit() : void {  
  }

  //come back to this funciton - I need to understand from fetchAPI until the end how the data is passed. 
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