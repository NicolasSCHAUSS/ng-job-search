import { Routes } from '@angular/router';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobListComponent } from './components/job-list/job-list.component';

export const routes: Routes = [
  {path:"jobs", component: JobListComponent},
  {path:"favorites", component: FavoriteListComponent},
  {path:"jobs/:jobId", component: JobDetailsComponent},
  {path:"**", redirectTo:'/jobs'}
];
