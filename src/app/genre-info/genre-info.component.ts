import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * GenreInfoComponent displays detailed information about a specific genre
 * in a modal dialog.
 *
 * It receives genre data through Angular Material's dialog data injection.
 */

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})

/**
 * Creates an instance of GenreInfoComponent.
 *
 * @param dialogRef Reference to the dialog opened for this component.
 * @param data The injected data containing genre information.
 * @param data.genre The name of the genre.
 * @param data.description A brief description of the genre.
 */

export class GenreInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: {
      genre: string;
      description: string;
    }
  ) { }

/**
 * Lifecycle hook that is called after data-bound properties are initialized.
 */

  ngOnInit() : void {  
  }

}
