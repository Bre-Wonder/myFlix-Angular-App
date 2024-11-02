import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieSnapshotComponent } from '../movie-snapshot/movie-snapshot.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  genre: any = "";
  user: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', favorites: [] as string[] };

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

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
    console.log(director, "Did director data pass?");
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

// Modifies movie to users favorite list
// This function needs to create a list attached to the user's token to then render a list in the user profile view
addFavoriteMovies(movieTitle: string): void {
  console.log(movieTitle);
  this.fetchApiData.addFavoriteMovie(this.userData.Username, movieTitle).subscribe((resp: any) => {
    console.log("movie successfully added to favorites");

    if(!this.userData.favorites) {
      this.userData.favorites = [];
    }
    this.userData.favorites.push(movieTitle);
    },
    (error) => {
      console.error('Error adding movie to favorites:', error);
      this.snackBar.open('Error. Please try again.', 'OK', { duration: 3000 });
    }

    )
  
}

//getting movies removed from the user's favorites list
// removeFavoritMovies(username: string, movieId: string): void {
//   this.fetchApiData.deleteFavoriteMovie(this.userData.Username, movieId).subscribe((resp: any) => {
//     console.log('movie successfully removed');
//     //needs to reload the list and update local storage, so the UI for that specific user updates. 
//   })
// }

  //User Add favrotie movie to their profile
  
  
  //#3 Create a users list of favorite movie
  //#4 Display Movie Cards in UI if user has selected a movie
  //#5 Put a message in if the user has not selected any movies.. aka empty array
  
  //Create like button to toggle



}
