import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  pending = false;

  email = '';
  password = '';

  error = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  async onSubmit(registerForm: NgForm) {
    if (!registerForm.valid) {
      return;
    }

    try {
      this.pending = true;
      await this.authService.register(this.email, this.password);
      this.router.navigateByUrl('/contact-dashboard');
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.pending = false;
    }
  }
}
