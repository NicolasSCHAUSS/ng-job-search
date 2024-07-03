import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobItem } from '../../models/job-item.model';
import { JobDetails } from '../../models/job-details.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpClient : HttpClient) {};

  public getJobItems() : Observable<Array<JobItem>> {
    return this.httpClient.get<Array<JobItem>>("/jobs");
  }

  public getJobDetails(jobId: string) : Observable<JobDetails> {
    return this.httpClient.get<JobDetails>(`/jobs/${jobId}`);
  } 

}
