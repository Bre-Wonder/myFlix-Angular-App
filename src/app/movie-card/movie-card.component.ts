import { Component, OnInit, Input, Injectable } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieSnapshotComponent } from '../movie-snapshot/movie-snapshot.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * MovieCardComponent is responsible for displaying individual movie cards,
 * handling user interactions like viewing movie details and managing favorite movies.
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  genre: any = "";
  user: any[] = [];


  /**
   * The user data passed from the parent component, including user details and favorite movies.
   */

  @Input() 
    userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] as string[] };

   /**
    * Checks if a given movie is in the user's list of favorite movies.
    * @param movieId The ID of the movie.
    * @returns `true` if the movie is a favorite, otherwise `false`.
    */
    isFavorite(movieId: string): boolean {
      const user = localStorage.getItem('user');
      const currentUser = JSON.parse(user || '');
      return currentUser.FavoriteMovies.includes(movieId);     
    };

  /**
   * The movie object to display in the card.
   */
  @Input() movie: any;
   

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) { }

/**
 * Angular lifecycle hook called after component initialization.
 */

ngOnInit(): void {
}

/**
 * Opens a modal dialog displaying a snapshot of the selected movie.
 * @param movieTitle The title of the movie.
 * @param description A short description of the movie.
 */
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

/**
 * Opens a modal dialog with detailed information about the movie’s director.
 * @param director The director’s name.
 * @param bio The director’s biography.
 * @param birth The director’s birth date.
 * @param death The director’s death date.
 */
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

/**
 * Opens a modal dialog with information about the genre of the movie.
 * @param genre The genre name.
 * @param description The genre description.
 */
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

/**
 * Adds a movie to the user's list of favorites and updates local storage.
 * This function needs to create a list attached to the user's token to then render a list in the user profile view
 * @param movieId The ID of the movie to add.
 * 
 */
addFavoriteMovies(movieId: string): void {

  //finding the user in the format of a string in the localStorage
  const user = localStorage.getItem('user');

  if(!user) {
    console.error('user not found');
    this.snackBar.open('User not found. Please login', 'OK', {duration: 3000});
    return;
  }

  console.log(user, ', the user in localStorage');

  //parse the user string to make the oject equal to a variable. This way the username can be extracted from the currentUser object
  const currentUser = JSON.parse(user);
  const username = currentUser.Username;

  this.fetchApiData.addFavoriteMovie(username, movieId).subscribe((resp: any) => {
    console.log("movie successfully added to favorites");

  //Making sure that movie isn't alreay in FavoriteMovies array   
    if(!currentUser.FavoriteMovies.includes(movieId)) {
      currentUser.FavoriteMovies.push(movieId);
      
    } else {
      
      //Lets user know with pop up that movie has already been added to the Favorite Movies list
      this.snackBar.open('Movie has already been added to favorites', 'OK', {duration: 3000});
    }
    

    //updating local storage to update local storage to reflect user adding favorite to movie to array
    localStorage.setItem('user', JSON.stringify(currentUser));
    console.log(currentUser);
    
    },
    (error) => {
      console.error('Error adding movie to favorites:', error);
      this.snackBar.open('Error. Please try again.', 'OK', { duration: 3000 });
    }

    )
  
}



/**
 * Removes a movie from the user's list of favorites and updates local storage.
 * @param movieId The ID of the movie to remove.
 */
removeFavoritMovies(movieId: string): void {

  //finding the user in the format of a string in the localStorage
  const user = localStorage.getItem('user');

  if(!user) {
    console.error('user not found');
    this.snackBar.open('User not found. Please login', 'OK', {duration: 3000});
    return;
  }

  console.log(user, ', the user in localStorage');

  //parse the user string to make the oject equal to a variable. This way the username can be extracted from the currentUser object
  const currentUser = JSON.parse(user);
  const username = currentUser.Username;

  this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe((resp: any) => {
    console.log("movie successfully removed from favorites");

    if(currentUser.FavoriteMovies) {
      currentUser.FavoriteMovies = currentUser.FavoriteMovies.filter((id: string) => id !== movieId);
    }
    
    //updating local storage to update local storage to reflect user adding favorite to movie to array
    localStorage.setItem('user', JSON.stringify(currentUser));
    console.log(currentUser);
    
    },
    (error) => {
      console.error('Error adding movie to favorites:', error);
      this.snackBar.open('Error. Please try again.', 'OK', { duration: 3000 });
    }

    )
}
  /**
   * Toggles a movie in and out of the user's favorites based on current state.
   * @param movieId The ID of the movie.
   */
  toggleIcon(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.removeFavoritMovies(movieId);
    } else {
      this.addFavoriteMovies(movieId);
    }

  }

  

}
