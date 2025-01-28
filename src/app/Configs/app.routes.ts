import { Routes } from '@angular/router';
import {TestComponent} from "../test/test.component";
import {AccueilComponent} from "../main/accueil/accueil.component";
import {RegisterComponent} from "../main/register/register.component";
import {LogInComponent} from "../main/log-in/log-in.component";
import {SearchComponent} from "../main/search/search.component";
import {UserProfileComponent} from "../main/user-profile/user-profile.component";
import {CreatePaperComponent} from "../main/create-paper/create-paper.component";

export const routes: Routes = [

  { path: 'test', component: TestComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'logIn', component: LogInComponent},
  { path: 'search', component: SearchComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'createPaper', component: CreatePaperComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', component: AccueilComponent },

];
