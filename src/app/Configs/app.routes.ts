import { Routes } from '@angular/router';
import {TestComponent} from "../test/test.component";
import {AccueilComponent} from "../main/accueil/accueil.component";

export const routes: Routes = [

  { path: 'test', component: TestComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', component: AccueilComponent },

];
