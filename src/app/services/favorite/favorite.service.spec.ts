import { TestBed } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';
import { JobItem } from '../../models/job-item.model';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty job list if no favorites in sessionStorage', () => {
    sessionStorage.removeItem('favorites');
    const newService = new FavoriteService();
    expect(newService.getJobItems()).toEqual([]);
  });

  it('should initialize with jobs from sessionStorage', () => {
    const mockJobs: JobItem[] = [
      { id: 1, companyName: 'Company A', title: 'Developer', companyLogo: 'logoA.png', reference: 'ref1' },
      { id: 2, companyName: 'Company B', title: 'Designer', companyLogo: 'logoB.png', reference: 'ref2' }
    ];
    sessionStorage.setItem('favorites', JSON.stringify(mockJobs));
    const newService = new FavoriteService();
    expect(newService.getJobItems()).toEqual(mockJobs);
  });

  it('should add a job to the job list', () => {
    const job: JobItem = { id: 1, companyName: 'Company A', title: 'Developer', companyLogo: 'logoA.png', reference: 'ref1' };
    service.updateJobs(job);
    expect(service.getJobItems()).toContain(job);
    expect(JSON.parse(sessionStorage.getItem('favorites')!)).toContain(job);
  });

  it('should remove a job from the job list', () => {
    const job: JobItem = { id: 1, companyName: 'Company A', title: 'Developer', companyLogo: 'logoA.png', reference: 'ref1' };
    service.updateJobs(job); // Add job
    service.updateJobs(job); // Remove job
    expect(service.getJobItems()).not.toContain(job);
    expect(JSON.parse(sessionStorage.getItem('favorites')!)).not.toContain(job);
  });

  it('should find a job by id', () => {
    const job1: JobItem = { id: 1, companyName: 'Company A', title: 'Developer', companyLogo: 'logoA.png', reference: 'ref1' };
    const job2: JobItem = { id: 2, companyName: 'Company B', title: 'Designer', companyLogo: 'logoB.png', reference: 'ref2' };
    service.updateJobs(job1);
    service.updateJobs(job2);
    expect(service.findFavoriteJobId(1)).toBe(0);
    expect(service.findFavoriteJobId(2)).toBe(1);
    expect(service.findFavoriteJobId(3)).toBe(-1);
  });
});
