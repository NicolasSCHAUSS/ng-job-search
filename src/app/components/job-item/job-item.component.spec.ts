import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JobItem } from '../../models/job-item.model';
import { JobItemComponent } from './job-item.component';

describe('JobItemComponent', () => {
  let component: JobItemComponent;
  let fixture: ComponentFixture<JobItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), JobItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display job details', () => {
    const mockJobItem: JobItem = {
      id: 1,
      companyName: 'Company A',
      title: 'Developer',
      companyLogo: 'logoA.png',
      reference: 'ref1'
    };
    component.jobItem = mockJobItem;
    fixture.detectChanges();

    const titleElement: HTMLElement = fixture.debugElement.query(By.css('.title-container')).nativeElement;
    const companyElement: HTMLElement = fixture.debugElement.query(By.css('.company-container')).nativeElement;
    const referenceElement: HTMLElement = fixture.debugElement.query(By.css('.reference-container')).nativeElement;
    const logoElement: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;

    expect(titleElement.textContent).toContain('Developer');
    expect(companyElement.textContent).toContain('Company A');
    expect(referenceElement.textContent).toContain('ref1');
    expect(logoElement.src).toContain('logoA.png');
  });

  it('should navigate to job details on click', () => {
    const mockJobItem: JobItem = {
      id: 1,
      companyName: 'Company A',
      title: 'Developer',
      companyLogo: 'logoA.png',
      reference: 'ref1'
    };
    component.jobItem = mockJobItem;
    fixture.detectChanges();

    spyOn(router, 'navigateByUrl');

    const spacerContainer: HTMLElement = fixture.debugElement.query(By.css('.title-container')).nativeElement;
    spacerContainer.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/jobs/1');
  });
});
