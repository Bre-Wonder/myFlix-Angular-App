import { Component, Input } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component that displays a list of movies fetched from the API.
 * Utilizes `MovieCardComponent` for individual movie representations
 * and includes a navigation bar for layout consistency.
 *
 */
@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})


export class MovieViewComponent {
  /**
   * An array holding the list of movie objects retrieved from the API.
   */
  movies: any[] = [];

  /**
   * Constructs the component and injects the FetchApiDataService for data retrieval.
   * 
   * @param fetchApiData - Service to fetch data from the movie API.
   */
  constructor(
    public fetchApiData: FetchApiDataService
  ){}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Triggers the movie-fetching process.
   */
  ngOnInit(): void {
    this.getMovies();
  }


  /**
   * Fetches all movies from the API using `FetchApiDataService`
   * and assigns the response to the `movies` array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

}
