import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pending = false;

  email = '';
  password = '';

  error = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  async onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }

    try {
      this.pending = true;
      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/contact-dashboard');
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.pending = false;
    }
  }
}
