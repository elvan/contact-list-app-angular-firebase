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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  async onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }

    this.pending = true;
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
    } finally {
      this.pending = false;
    }
  }
}
