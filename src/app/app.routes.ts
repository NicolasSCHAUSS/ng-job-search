import { Routes } from '@angular/router';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobListComponent } from './components/job-list/job-list.component';

export const routes: Routes = [
  {path:"jobs-list", component: JobListComponent},
  {path:"favorites-list", component: FavoriteListComponent},
  {path:"jobs/:idJob", component: JobDetailsComponent},
  {path:"**", redirectTo:'/jobs-list'}
];
