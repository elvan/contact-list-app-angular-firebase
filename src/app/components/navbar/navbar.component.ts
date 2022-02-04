import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  collapsed = true;

  user$: Observable<firebase.User | null>;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.user$ = this.authService.getUser();
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
