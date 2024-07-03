import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobItem } from '../../models/job-item.model';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [],
  templateUrl: './job-item.component.html',
  styleUrl: './job-item.component.css'
})
export class JobItemComponent {

  @Input()
  public jobItem!: JobItem;

  constructor(private router: Router){}

  public showJobDetails(): void {
    this.router.navigateByUrl(`/jobs/${this.jobItem.id}`);
  }
}
