import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  collapsed = true;

  currentUser: firebase.User | null = null;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  openModal(content: any): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.logout();
        },
        (reason) => {}
      );
  }

  private async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
