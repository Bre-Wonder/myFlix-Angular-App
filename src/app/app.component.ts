import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-App';

  constructor(public dialog: MatDialog) { }
//Function opens up dialog when the signup button is clicked
openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
  //Assigning the dialog a width
    width: '280px'
    });
  }
}
