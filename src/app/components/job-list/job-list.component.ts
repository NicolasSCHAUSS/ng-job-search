import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { JobItem } from '../../models/jobItem';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { JobService } from '../../services/job/job.service';
import { JobItemComponent } from '../job-item/job-item.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [JobItemComponent, AsyncPipe, NgClass],
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

  public isFavoriteJob(jobId: number): boolean {
    return this.favoriteService.findFavoriteJobId(jobId) > -1 ? true : false ;
  }
}
