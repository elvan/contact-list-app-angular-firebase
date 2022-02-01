import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  authIsReady = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .getCurrentUser()
      .then(
        (user) => {},
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.authIsReady = true;
      });
  }
}
