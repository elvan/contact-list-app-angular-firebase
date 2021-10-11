import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-contacts-dashboard',
  templateUrl: './contacts-dashboard.component.html',
  styleUrls: ['./contacts-dashboard.component.css'],
})
export class ContactsDashboardComponent implements OnInit {
  contacts$: Observable<any[]> = of([]);

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.contacts$ = this.firestore.collection('contacts').valueChanges();
  }
}
