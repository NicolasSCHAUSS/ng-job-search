import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    component.title = 'My App Title';
    fixture.detectChanges();
    const titleElement: HTMLElement = debugElement.query(By.css('.app-title')).nativeElement;
    expect(titleElement.textContent).toContain('My App Title');
  });

  it('should render job tab with correct attributes', () => {
    const jobTabElement: HTMLElement = debugElement.query(By.css('a.job-tab-title[routerLink="/jobs"]')).nativeElement;
    expect(jobTabElement).toBeTruthy();
    expect(jobTabElement.textContent).toContain('JOBS');
  });

  it('should render favorites tab with correct attributes', () => {
    const favoritesTabElement: HTMLElement = debugElement.query(By.css('a.job-tab-title[routerLink="/favorites"]')).nativeElement;
    expect(favoritesTabElement).toBeTruthy();
    expect(favoritesTabElement.textContent).toContain('FAVORITES');
  });

  it('should have routerLink directives', () => {
    const links = debugElement.queryAll(By.directive(RouterLinkWithHref));
    expect(links.length).toBe(2);
    const jobLink = links[0].injector.get(RouterLinkWithHref);
    const favoritesLink = links[1].injector.get(RouterLinkWithHref);
    expect(jobLink['commands']).toEqual(['/jobs']);
    expect(favoritesLink['commands']).toEqual(['/favorites']);
  });

  it('should have routerLinkActive directives', () => {
    const linksActive = debugElement.queryAll(By.directive(RouterLinkActive));
    expect(linksActive.length).toBe(2);
  });
});
