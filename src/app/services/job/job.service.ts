import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobItem } from '../../models/jobItem';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpClient : HttpClient) {};

  public getJobItems() : Observable<Array<JobItem>> {
    return this.httpClient.get<Array<JobItem>>("/jobs");
  }

}
