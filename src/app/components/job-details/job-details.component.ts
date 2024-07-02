import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobDetails } from '../../models/jobDetails';
import { JobService } from '../../services/job/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit , OnDestroy{
  
  private $params!: Subscription;
  
  private $jobDetails!: Subscription;

  public jobDetails!: JobDetails;

  constructor(private jobService: JobService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location){};

  public ngOnInit(): void {
    this.$params = this.activatedRoute.params.subscribe(params => {
      this.$jobDetails = this.jobService.getJobDetails(params["idJob"]).subscribe( j => {
        this.jobDetails = j
      });
    });
  }

  public backToLastRoute(): void {
    this.location.back();
  }

  public ngOnDestroy(): void {
    this.$jobDetails.unsubscribe();
    this.$params.unsubscribe();
  }
}
