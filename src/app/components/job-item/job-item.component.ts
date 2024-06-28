import { Component, Input } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { JobItem } from '../../models/jobItem';

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
  
  public isFavorite: boolean = false;

  constructor(){}

  public toggleFavorite(): void{
    this.isFavorite = !this.isFavorite;
  }
}
