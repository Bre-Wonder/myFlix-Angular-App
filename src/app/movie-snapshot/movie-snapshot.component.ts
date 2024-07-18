import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-snapshot',
  templateUrl: './movie-snapshot.component.html',
  styleUrls: ['./movie-snapshot.component.scss']
})
export class MovieSnapshotComponent implements OnInit {

  public movieData: {
    movieTitle: string;
    description: string;
  }

  constructor(
    public dialogRef: MatDialogRef<MovieSnapshotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movieData = {
      movieTitle: data.movieTitle,
      description: data.description
    };
  }

  ngOnInit() : void {  
  }


  }
