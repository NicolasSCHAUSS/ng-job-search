import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';

export const routes: Routes = [
  {path:"", redirectTo:'/jobs-list', pathMatch: "full"},
  {path:"jobs-list", component: JobListComponent},
  {path:"favorites-list", component: FavoriteListComponent},
  {path:"**", component: AppComponent}
];
