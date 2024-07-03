import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JobDetailsComponent } from './job-details.component';
import { JobService } from '../../services/job/job.service';
import { JobDetails } from '../../models/job-details.model';

describe('JobDetailsComponent', () => {
  let component: JobDetailsComponent;
  let fixture: ComponentFixture<JobDetailsComponent>;
  let jobService: jasmine.SpyObj<JobService>;
  let location: jasmine.SpyObj<Location>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const jobServiceSpy = jasmine.createSpyObj('JobService', ['getJobDetails']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [DatePipe, JobDetailsComponent],
      providers: [
        { provide: JobService, useValue: jobServiceSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ jobId: '1' }) }
        }
      ]
    }).compileComponents();

    jobService = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsComponent);
    component = fixture.componentInstance;

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
      publishDate: '2023-01-11'
    };

    jobService.getJobDetails.and.returnValue(of(mockJobDetails));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display job details', () => {
    const companyLogo: HTMLImageElement = fixture.debugElement.query(By.css('.job-details-logo')).nativeElement;
    const jobTitle: HTMLElement = fixture.debugElement.query(By.css('.job-details-title')).nativeElement;
    const jobTags: HTMLElement[] = fixture.debugElement.queryAll(By.css('.job-details-tag')).map(de => de.nativeElement);
    const publishDate: HTMLElement = fixture.debugElement.query(By.css('.job-details-content-title .job-details-content')).nativeElement;
    const jobLocation: HTMLElement = fixture.debugElement.query(By.css('.job-details-content-title:nth-of-type(2) .job-details-content')).nativeElement;
    const jobReference: HTMLElement = fixture.debugElement.query(By.css('.job-details-content-title:nth-of-type(3) .job-details-content')).nativeElement;
    const jobDescription: HTMLElement = fixture.debugElement.query(By.css('.job-details-content-description')).nativeElement;

    expect(companyLogo.src).toContain('logoA.png');
    expect(jobTitle.textContent).toContain('Company A - Developer');
    expect(jobTags.length).toBe(2);
    expect(jobTags[0].innerHTML).toBe('Full-time');
    expect(jobTags[1].innerHTML).toBe('Tech');
    expect(publishDate.textContent).toBe('1/11/2023');
    expect(jobLocation.textContent).toBe('City A');
    expect(jobReference.textContent).toBe('ref1');
    expect(jobDescription.innerHTML).toBe('Job description');
  });

  it('should navigate back to the last route on back button click', () => {
    const backButton: HTMLElement = fixture.debugElement.query(By.css('button.job-details-back')).nativeElement;
    backButton.click();
    expect(location.back).toHaveBeenCalled();
  });

  it('should unsubscribe from observables on destroy', () => {
    spyOn(component['$jobDetails'], 'unsubscribe');
    spyOn(component['$params'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['$jobDetails'].unsubscribe).toHaveBeenCalled();
    expect(component['$params'].unsubscribe).toHaveBeenCalled();
  });
});
