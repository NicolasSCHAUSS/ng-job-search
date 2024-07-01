import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobItem } from '../../models/jobItem';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private jobs!: Array<JobItem>

  private favoriteKey: string = "favorites";

  constructor() {
    let favorites = sessionStorage.getItem(this.favoriteKey);
    if(favorites)
      this.jobs = JSON.parse(favorites);
    else {
      sessionStorage.setItem(this.favoriteKey, "");
      this.jobs = new Array<JobItem>();
    }
  }

  public getJobItems(): Array<JobItem> {
    return this.jobs;
  }

  public updateJobs(job: JobItem): void {
    let findJobIndex = this.findFavoriteJobId(job.id);

    if(findJobIndex > -1)
      this.jobs.splice(findJobIndex, 1);
    else
      this.jobs.push(job);

    sessionStorage.setItem(this.favoriteKey, JSON.stringify(this.jobs));
  }

  public findFavoriteJobId(jobId: number): number {
    return this.jobs.findIndex(j => j.id === jobId);
  }

}
