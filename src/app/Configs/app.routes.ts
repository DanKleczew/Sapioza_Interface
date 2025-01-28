import { Routes } from '@angular/router';
import {TestComponent} from "../test/test.component";
import {AccueilComponent} from "../main/accueil/accueil.component";
import {UserProfileComponent} from "../main/user-profile/user-profile.component";
import {RegisterComponent} from "../main/register/register.component";
import {LogInComponent} from "../main/log-in/log-in.component";

export const routes: Routes = [

  { path: 'test', component: TestComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'profile/:id', component: UserProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'logIn', component: LogInComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', component: AccueilComponent },

];
