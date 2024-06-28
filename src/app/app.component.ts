import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobItemComponent } from './components/job-item/job-item.component';
import { JobService } from './services/job/job.service';
import { Observable } from 'rxjs';
import { JobItem } from './models/jobItem';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JobItemComponent, NgFor, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [JobService]
})
export class AppComponent implements OnInit{
  title = 'ng-job-search';

  public $jobs! : Observable<Array<JobItem>>

  constructor(private jobService: JobService){}

  ngOnInit(): void {
    this.$jobs = this.jobService.getJobItems();
  }

}
