import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { JobItem } from '../../models/jobItem';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { JobItemComponent } from '../job-item/job-item.component';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [NgFor, JobItemComponent],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css',
  providers: [FavoriteService]
})
export class FavoriteListComponent {

  @Input()
  public favorites!: Array<JobItem>;

  constructor(private favoriteService: FavoriteService){}

  public ngOnInit(): void {
    this.favorites = this.favoriteService.getJobItems();
  }
}
