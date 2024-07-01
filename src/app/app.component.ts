import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { FavoriteService } from './services/favorite/favorite.service';
import { JobService } from './services/job/job.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, JobListComponent, FavoriteListComponent, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [JobService, FavoriteService]
})
export class AppComponent {
  title = 'Find your job';
}
