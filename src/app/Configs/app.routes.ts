import { Routes } from '@angular/router';
import {TestComponent} from "../test/test.component";
import {AccueilComponent} from "../main/accueil/accueil.component";
import {SearchComponent} from "../main/search/search.component";
import {UserProfileComponent} from "../main/user-profile/user-profile.component";
import {PaperFocusComponent} from "../main/paper-focus/paper-focus.component";
import {PaperEditorComponent} from "../main/paper-editor/paper-editor.component";
import {ConnectionComponent} from "../main/connection/connection.component";
import {ModifUserProfileComponent} from "../main/user-profile/modif-user-profile/modif-user-profile.component";

export const routes: Routes = [

  { path: 'test', component: TestComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'search', component: SearchComponent},
  { path: 'article/:paperId', component: PaperFocusComponent},
  { path: 'connection', component: ConnectionComponent},
  { path: 'submit', component: PaperEditorComponent},
  { path: 'submit/:paperId', component: PaperEditorComponent},
  { path: 'profile/modify/:userid', component: ModifUserProfileComponent},
  { path: 'profile/:userId', component: UserProfileComponent},
  { path: 'create', component: PaperEditorComponent},
  { path: 'update/:paperId', component: PaperEditorComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: '**', component: AccueilComponent },
];
