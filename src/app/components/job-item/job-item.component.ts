import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobItem } from '../../models/jobItem';
import { FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './job-item.component.html',
  styleUrl: './job-item.component.css'
})
export class JobItemComponent implements OnInit{

  @Input()
  public jobItem!: JobItem;
  
  @Output()
  public isFavoriteEvent: EventEmitter<JobItem> = new EventEmitter<JobItem>();

  public isFavorite!: boolean;

  constructor(private favoriteService: FavoriteService){}

  public ngOnInit(): void {
      if(this.favoriteService.findFavoriteJobId(this.jobItem.id) > -1)
        this.isFavorite = true;
  }

  public toggleFavorite(): void{
    this.isFavorite = !this.isFavorite;
    this.isFavoriteEvent.emit(this.jobItem);
  }
}
