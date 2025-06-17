import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component responsible for displaying a snapshot of movie details in a dialog.
 */
@Component({
  selector: 'app-movie-snapshot',
  templateUrl: './movie-snapshot.component.html',
  styleUrls: ['./movie-snapshot.component.scss']
})
export class MovieSnapshotComponent implements OnInit {

  /**
   * Object containing movie details to be displayed.
   * @property {string} movieTitle - The title of the movie.
   * @property {string} description - A brief description of the movie.
   */
  public movieData: {
    movieTitle: string;
    description: string;
  }

  /**
   * Creates an instance of MovieSnapshotComponent.
   *
   * @param dialogRef - Reference to the dialog containing the component.
   * @param data - Injected data object containing the movie information.
   */
  constructor(
    public dialogRef: MatDialogRef<MovieSnapshotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movieData = {
      movieTitle: data.movieTitle,
      description: data.description
    };
  }

  /**
   * Angular lifecycle hook that is called after component initialization.
   */
  ngOnInit() : void {  
  }


  }
