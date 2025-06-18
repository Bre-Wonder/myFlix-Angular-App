# MyFlixAngularApp

### Project Descriptions:
This is a client-side application built in Angular to display movie and profile information to a signed up user. The user will be able to view a list of movies and update profile information specific to their account connected to a REST API and database. 


### Technologies Used: 
Angular | Typescript | Angular Materials | Copilot to generate documentation

### How to start up this project?

First check to see if Angular is installed by running this command:
`ng --version`

The next step is making sure that Angular is running on at least version 9. You can use the following command to update your version of Angular:
`npm install -g @angular/cli@latest`
(you can check to make sure your version is updated by using the command in the previous instruction step)

If you need to install angular, run this command:
`npm install -g @angular/cli`

Now its time to create your app. Run this command in your terminal to create your new app:
`ng new myFlix-Angular-App` 
(note: you can replace myFlix-Angular-App with whatever you would like to name it; You can press `y` for yest when the app creation asks about adding routes)

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

To learn more about building components and all other part of Angular see their documentation at: `https://angular.dev/`


### API Used:
The API used for this project was a REST API that I built through coursework in Career Foundry using Express and Node.js. I had created endpoints specifically designed for this React App. You can see the code for the API in GitHub under movie_api. 

### Learning Moments: 
I was working on the profile-view.comoponent.ts file for the user’s profile and having to decide how to get the page to display only the user’s favorite movies. I did not have an endpoint in my API that allows me to only grab the users favorites, so I needed to create a filter in some way or add an endpoint. My application was small, so I decided to retrieve all the movies and filter out the ones that were not marked as a favorite by the user. For a large application this would not be best, the performance time would suffer due to loading all the movies and then filtering them. It would be faster to only have the application load only the favorite movies. Angular is also server dependent driving the request to update on the backend each time causing a large get request to lag the response time. 

### What would I do differently? 
If I had more time or the web application was larger, I woudld create another endpoint in my API to use a get request for only the user's favorite movies. 



GitHub Repository site: https://github.com/Bre-Wonder/myFlix-Angular-App

Live Site: https://bre-wonder.github.io/myFlix-Angular-App/welcome

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
