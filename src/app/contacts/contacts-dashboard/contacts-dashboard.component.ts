import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-dashboard',
  templateUrl: './contacts-dashboard.component.html',
  styleUrls: ['./contacts-dashboard.component.css'],
})
export class ContactsDashboardComponent implements OnInit {
  contacts = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '555-555-5555',
    },
    {
      id: 2,
      name: 'Aubrey Mall',
      email: 'aubrey@mall.com',
      phone: '555-555-6666',
    },
    {
      id: 3,
      name: 'Sam Smith',
      email: 'sam@smith.com',
      phone: '555-555-7777',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
