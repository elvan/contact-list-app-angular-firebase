import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ContactDashboardComponent } from './features/contacts/contact-dashboard/contact-dashboard.component';
import { ContactDetailsComponent } from './features/contacts/contact-details/contact-details.component';
import { ContactFormComponent } from './features/contacts/contact-form/contact-form.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  {
    path: 'contact-dashboard',
    component: ContactDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact-form',
    component: ContactFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact-form/:id',
    component: ContactFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact-details/:id',
    component: ContactDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
