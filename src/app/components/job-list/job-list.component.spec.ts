import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListComponent } from './job-list.component';
import { JobService } from '../../services/job/job.service';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { JobItemComponent } from '../job-item/job-item.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { of } from 'rxjs';
import { JobItem } from '../../models/job-item.model';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let jobService: jasmine.SpyObj<JobService>;
  let favoriteService: jasmine.SpyObj<FavoriteService>;

  beforeEach(async () => {
    const jobServiceSpy = jasmine.createSpyObj('JobService', ['getJobItems']);
    const favoriteServiceSpy = jasmine.createSpyObj('FavoriteService', ['updateJobs', 'findFavoriteJobId']);

    await TestBed.configureTestingModule({
      imports: [JobListComponent, JobItemComponent, AsyncPipe, NgClass],
      providers: [
        { provide: JobService, useValue: jobServiceSpy },
        { provide: FavoriteService, useValue: favoriteServiceSpy }
      ]
    }).compileComponents();

    jobService = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;
    favoriteService = TestBed.inject(FavoriteService) as jasmine.SpyObj<FavoriteService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize $jobs on ngOnInit', () => {
    const mockJobs: JobItem[] = [
      { id: 1, companyName: 'Company A', title: 'Developer', companyLogo: 'logoA.png', reference: 'ref1' },
      { id: 2, companyName: 'Company B', title: 'Designer', companyLogo: 'logoB.png', reference: 'ref2' }
    ];
    jobService.getJobItems.and.returnValue(of(mockJobs));
    component.ngOnInit();

    expect(component.$jobs).toBeDefined();
    component.$jobs.subscribe(jobs => {
      expect(jobs).toEqual(mockJobs);
    });
  });

  it('should call updateJobs on FavoriteService when updateFavorites is called', () => {
    const mockJob: JobItem = { id: 1, companyName: 'Company A', title: 'Developer', companyLogo: 'logoA.png', reference: 'ref1' };
    component.updateFavorites(mockJob);
    expect(favoriteService.updateJobs).toHaveBeenCalledWith(mockJob);
  });

  it('should return true from isFavoriteJob when job is favorite', () => {
    favoriteService.findFavoriteJobId.and.returnValue(0);
    expect(component.isFavoriteJob(1)).toBeTrue();
    expect(favoriteService.findFavoriteJobId).toHaveBeenCalledWith(1);
  });

  it('should return false from isFavoriteJob when job is not favorite', () => {
    favoriteService.findFavoriteJobId.and.returnValue(-1);
    expect(component.isFavoriteJob(2)).toBeFalse();
    expect(favoriteService.findFavoriteJobId).toHaveBeenCalledWith(2);
  });
});