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

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  genre: any = "";
  user: any[] = [];

  @Input() 
    userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] as string[] };
    isFavorite(movieId: string): boolean {
      const user = localStorage.getItem('user');
      const currentUser = JSON.parse(user || '');
      return currentUser.FavoriteMovies.includes(movieId);
      
    }
   

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) { }

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



//getting movies removed from the user's favorites list
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

  toggleIcon(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.removeFavoritMovies(movieId);
    } else {
      this.addFavoriteMovies(movieId);
    }

  }

  

}
