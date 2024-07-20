import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieSnapshotComponent } from '../movie-snapshot/movie-snapshot.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  genre: any = "";

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

// Opens the dialog for the discription of the movie
openMovieSnapshotDialog(movieTitle: string, description: string): void {
  this.dialog.open(MovieSnapshotComponent, {
    data: {
      movieTitle: movieTitle,
      description: description
    },
  //Assigning the dialog a width
  width: '600px'
  });
}

// Opens the dialog about information for the director
openDirectorInfoDialog(
  director: string,
  bio: string,
  birth: string,
  death: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        director: director,
        bio: bio,
        birth: birth,
        death: death,
      },
    //Assigning the dialog a width
    width: '600px'
    });
}

// Opens the dialog for the genre of the movie
openGenreInfoDialog(genre: string, description: string): void {
  this.dialog.open(GenreInfoComponent, {
    data: {
      genre: genre,
      description: description
    },
  //Assigning the dialog a width
  width: '600px'
  });
}

}
