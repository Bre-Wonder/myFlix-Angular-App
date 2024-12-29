import { Component, OnInit, Input } from '@angular/core';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
})
export class UserProfileViewComponent implements OnInit{

  @Input() userData = { Username: 'Please Sign In', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };

  user: any = {};
  movies: any = [];
  noMovies: string = '';
  userMessage: string = '';
  favoriteMovies = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public movieCard: MovieCardComponent,

    ) { }

  ngOnInit(): void {
    console.log("Init before get user");
    this.getUser();
  }

  
  public getUser(): void {

    //retrieved data from localStorage + parses the object
    const user = JSON.parse(localStorage.getItem('user') as string);
    console.log(user, "Parsed JSON Object");

    // helps with error handling with if/else statement
    if(user) {

      // setting username from the parsed object to the "this.userData.Username"
      this.userData.Username = user.Username;
      console.log(this.userData.Username, "My Username");
    
      //collecting the user data from the API
      this.fetchApiData.getUser(this.userData.Username).subscribe((resp: any) => {
        this.userData = resp;
        console.log("I was called", this.userData.Username)
      
      });
    
    } else {
      // error handler
      console.error('No data in localStorage found');
    }

  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

    
   //Function opens up dialog when the update button is pressed in the user profile view
   openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserComponent, {
    width: '280px'
    });
  }

  //Delete User's Account
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

  //find user's favortie movies from the user object and display them if user has selected them
  // displayFavoriteMovie(): void {
  //   this.fetchApiData.getAllMovies().subscribe((resp: any) => {
  //     this.movies = resp;
  //     console.log(this.movies);
  //     return this.movies;
  //   });
  // }


    this.router.navigate(['welcome']);
  } 

}