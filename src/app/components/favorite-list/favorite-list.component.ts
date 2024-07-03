import { Component, OnInit } from '@angular/core';
import { JobItem } from '../../models/job-item.model';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { JobItemComponent } from '../job-item/job-item.component';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [JobItemComponent],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent implements OnInit{

  public favorites!: Array<JobItem>;

  constructor(private favoriteService: FavoriteService){}

  public ngOnInit(): void {
    this.favorites = this.favoriteService.getJobItems();
  }
}
