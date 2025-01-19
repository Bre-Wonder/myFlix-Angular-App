import { Component, Input } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})


export class MovieViewComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService
  ){}

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

}
