import { Component, OnInit, Input } from '@angular/core';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieCardComponent } from '../movie-card/movie-card.component';

/**
 * Displays and manages the user's profile view, including account details and favorite movies.
 */
@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
})
export class UserProfileViewComponent implements OnInit{

  /**
   * Stores user information received from the server or local storage.
   */
  @Input() userData = { Username: 'Please Sign In', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };

  /** Holds the raw user object parsed from local storage. */
  user: any = {};

  /** Message displayed when user has no favorite movies. */
  noMovies: string = '';

  /** General user status message. */
  userMessage: string = '';

  /** Holds a list of favorite movie IDs. */
  favoriteMovies = [];

  /** Full favorite movie objects retrieved from API. */
  favorites: any = [];

  /**
   * @param dialog Angular Material Dialog service
   * @param fetchApiData Service to fetch user and movie data
   * @param snackBar Angular Material Snackbar service
   * @param router Angular Router for navigation
   * @param movieCard Reference to MovieCardComponent (unused directly)
   */
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public movieCard: MovieCardComponent,

    ) { }

  /**
   * Initializes the component by retrieving user data and favorite movies.
   */ 
  ngOnInit(): void {
    console.log("Init before get user");
    this.getUser();
    this.displayFavoriteMovies();
  }

  /**
   * Retrieves user details from local storage and fetches fresh data from the API.
   */
  public getUser(): void {

    /** retrieved data from localStorage + parses the object */
    const user = JSON.parse(localStorage.getItem('user') as string);
    console.log(user, "Parsed JSON Object");

    /**  helps with error handling with if/else statement */
    if(user) {

      /** setting username from the parsed object to the "this.userData.Username" */ 
      this.userData.Username = user.Username;
      console.log(this.userData.Username, "My Username");
    
      /** collecting the user data from the API */
      this.fetchApiData.getUser(this.userData.Username).subscribe((resp: any) => {
        this.userData = resp;
        console.log("I was called", this.userData.Username)
      
      });
    
    } else {
      /** error handler */ 
      console.error('No data in localStorage found');
    }

  }

   /**
   * Opens the dialog when update button is pressed allowing the user to update profile details.
   */
   openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserComponent, {
    width: '280px'
    });
  }

  /**
   * Deletes the user account via the API and clears local storage.
   */
  deleteUser(): void {
    console.log('Delete Button was pressed');

    this.fetchApiData.deleteUser(this.userData.Username).subscribe((resp: any) => {
      console.log('User Deleted');
      this.snackBar.open('Your Account was deleted successfully', 'OK', {
        duration: 2000
      });
    
    localStorage.clear();
    console.log('User Cleared from localStorage');
    }, 

    (error) => {
      this.snackBar.open('Error with deleting user: ' + error, 'OK', { 
        duration: 2000
      });
    }

    
    );

  }

  /**
   * Retrieves all movies and filters them down to the user's favorites.
   */
  public displayFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      const user = JSON.parse(localStorage.getItem('user') as string || '{}');
      const { FavoriteMovies } = user;
      this.favorites = resp.filter((movie: any) =>
        FavoriteMovies.includes(movie._id)
      );
      console.log(this.favorites);
   
    });

   
  } 
  

}