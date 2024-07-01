import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { JobItem } from '../../models/jobItem';
import { JobItemComponent } from '../job-item/job-item.component';
import { JobService } from '../../services/job/job.service';
import { FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [JobItemComponent, NgFor, AsyncPipe],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  
  @Input()
  public $jobs!: Observable<Array<JobItem>>;

  constructor(private jobService: JobService, private favoriteService: FavoriteService){}

  public ngOnInit(): void {
    this.$jobs = this.jobService.getJobItems();
  }

  public updateFavorites(job: JobItem): void {
    this.favoriteService.updateJobs(job);
  }
}
