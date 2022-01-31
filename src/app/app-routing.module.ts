import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContactDashboardComponent } from './features/contacts/contact-dashboard/contact-dashboard.component';
import { ContactFormComponent } from './features/contacts/contact-form/contact-form.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contact-dashboard',
    component: ContactDashboardComponent,
  },
  {
    path: 'contact-form',
    component: ContactFormComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
