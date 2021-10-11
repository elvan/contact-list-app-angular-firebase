import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCreateComponent } from './contacts/contact-create/contact-create.component';
import { ContactsDashboardComponent } from './contacts/contacts-dashboard/contacts-dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contacts',
    component: ContactsDashboardComponent,
  },
  {
    path: 'contact-create',
    component: ContactCreateComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
