import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ContactDashboardComponent } from './features/contacts/contact-dashboard/contact-dashboard.component';
import { ContactDetailsComponent } from './features/contacts/contact-details/contact-details.component';
import { ContactFormComponent } from './features/contacts/contact-form/contact-form.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact-dashboard', component: ContactDashboardComponent },
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'contact-form/:id', component: ContactFormComponent },
  { path: 'contact-details/:id', component: ContactDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
