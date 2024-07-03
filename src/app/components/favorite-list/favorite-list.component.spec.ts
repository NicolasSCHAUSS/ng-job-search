import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { JobItemComponent } from '../job-item/job-item.component';
import { FavoriteListComponent } from './favorite-list.component';
import { JobItem } from '../../models/job-item.model';

describe('FavoriteListComponent', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;
  let favoriteService: jasmine.SpyObj<FavoriteService>;

  beforeEach(async () => {
    const favoriteServiceSpy = jasmine.createSpyObj('FavoriteService', ['getJobItems']);

    await TestBed.configureTestingModule({
      imports: [FavoriteListComponent, JobItemComponent],
      providers: [
        { provide: FavoriteService, useValue: favoriteServiceSpy }
      ]
    }).compileComponents();

    favoriteService = TestBed.inject(FavoriteService) as jasmine.SpyObj<FavoriteService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display favorite job items', () => {
    const mockJobItems: JobItem[] = [
      { id: 1, companyName: 'Company A', title: 'Developer', companyLogo: 'logoA.png', reference: 'ref1' },
      { id: 2, companyName: 'Company B', title: 'Designer', companyLogo: 'logoB.png', reference: 'ref2' }
    ];
    favoriteService.getJobItems.and.returnValue(mockJobItems);
    fixture.detectChanges();

    const jobItems = fixture.debugElement.queryAll(By.css(".job-item-container"));
    expect(jobItems.length).toBe(2);
  });

  it('should display "No favorite selected" when there are no favorite job items', () => {
    favoriteService.getJobItems.and.returnValue([]);
    fixture.detectChanges();

    const noFavoritesMessage: HTMLElement = fixture.debugElement.query(By.css('.empty-job')).nativeElement;
    expect(noFavoritesMessage.textContent).toBe('No favorite selected');
  });
});
