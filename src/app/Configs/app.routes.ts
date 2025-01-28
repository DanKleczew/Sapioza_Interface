import { Routes } from '@angular/router';
import {TestComponent} from "../test/test.component";
import {AccueilComponent} from "../main/accueil/accueil.component";
import {RegisterComponent} from "../main/register/register.component";
import {LogInComponent} from "../main/log-in/log-in.component";

export const routes: Routes = [

  { path: 'test', component: TestComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'logIn', component: LogInComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', component: AccueilComponent },

];
