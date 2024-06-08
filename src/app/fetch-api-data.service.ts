import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwErro } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring api url that allow app to uses end points from client app API
const apiUrl = '' // add host API Url here
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params
  //This will provide HttpClient tot he entire class, making it available via this.htt;
  constructor(private http: HttpClient) { 

  }

  // Making API call for user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // API call for user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // API get request for all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  getMovieByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', director, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

    private extractResponseData(res: Response): any
  {
      const body = res;
      return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
     console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}` );
    }
    return throwError(
      'Somthing bad happened; please try again later.');
  }
}
