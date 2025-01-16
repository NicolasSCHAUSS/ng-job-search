import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { JobService } from './job.service';
import { JobItem } from '../../models/job-item.model';
import { JobDetails } from '../../models/job-details.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [JobService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch job items', () => {
    const mockJobItems: JobItem[] = [
      { id: 1, companyName: 'Company A', title: 'Developer', companyLogo: 'logoA.png', reference: 'ref1' },
      { id: 2, companyName: 'Company B', title: 'Designer', companyLogo: 'logoB.png', reference: 'ref2' }
    ];

    service.getJobItems().subscribe((jobs) => {
      expect(jobs.length).toBe(2);
      expect(jobs).toEqual(mockJobItems);
    });

    const req = httpMock.expectOne('/jobs');
    expect(req.request.method).toBe('GET');
    req.flush(mockJobItems);
  });

  it('should fetch job details', () => {
    const mockJobDetails: JobDetails = {
      id: 1,
      companyName: 'Company A',
      title: 'Developer',
      companyLogo: 'logoA.png',
      reference: 'ref1',
      location: 'City A',
      industries: ['Tech'],
      types: ['Full-time'],
      description: 'Job description',
      publishDate: '2023-01-01'
    };

    service.getJobDetails('1').subscribe((job) => {
      expect(job).toEqual(mockJobDetails);
    });

    const req = httpMock.expectOne('/jobs/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockJobDetails);
  });
});

