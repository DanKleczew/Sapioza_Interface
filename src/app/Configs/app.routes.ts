import { Routes } from '@angular/router';
import {AccueilComponent} from "../main/accueil/accueil.component";
import {SearchComponent} from "../main/search/search.component";
import {UserProfileComponent} from "../main/user-profile/user-profile.component";
import {PaperFocusComponent} from "../main/paper-focus/paper-focus.component";
import {PaperEditorComponent} from "../main/paper-editor/paper-editor.component";
import {ReviewsComponent} from "../main/reviews/reviews.component";
import {UserAuthenticationComponent} from "../main/user-authentication/user-authentication.component";
import {UserUpdateProfileComponent} from "../main/user-update-profile/user-update-profile.component";
import {NotificationsComponent} from "../main/notifications/notifications.component";

export const routes: Routes = [

  { path: 'accueil', component: AccueilComponent },
  { path: 'search', component: SearchComponent},
  { path: 'article/:paperId', component: PaperFocusComponent},
  { path: 'comments/:paperId', component: ReviewsComponent},
  { path: 'connection', component: UserAuthenticationComponent},
  { path: 'abonnements', component: NotificationsComponent},
  { path: 'submit', component: PaperEditorComponent},
  { path: 'submit/:paperId', component: PaperEditorComponent},
  { path: 'profile/update/:userId', component: UserUpdateProfileComponent},
  { path: 'profile/:userId', component: UserProfileComponent},
  { path: 'create', component: PaperEditorComponent},
  { path: 'update/:paperId', component: PaperEditorComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: '**', component: AccueilComponent },
];
