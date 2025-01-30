import { Routes } from '@angular/router';
import {TestComponent} from "../test/test.component";
import {AccueilComponent} from "../main/accueil/accueil.component";
import {RegisterComponent} from "../main/user-profile/register/register.component";
import {SearchComponent} from "../main/search/search.component";
import {UserProfileComponent} from "../main/user-profile/user-profile.component";
import {LoginComponent} from "../main/user-profile/login/login.component";
import {PaperFocusComponent} from "../main/paper-focus/paper-focus.component";
import {PaperEditorComponent} from "../main/paper-editor/paper-editor.component";

export const routes: Routes = [

  { path: 'test', component: TestComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'search', component: SearchComponent},
  { path: 'paper/:paperId', component: PaperFocusComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'submit', component: PaperEditorComponent},
  { path: 'submit/:paperId', component: PaperEditorComponent},
  { path: 'profile/:userId', component: UserProfileComponent},
  { path: 'create', component: PaperEditorComponent},
  { path: 'update/:paperId', component: PaperEditorComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: '**', component: AccueilComponent },
];
