import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { EventListComponent } from './event-list/event-list.component';
import { Observable, of } from 'rxjs';
import { EventSummaryComponent } from './event-summary/event-summary.component';
export class MockApiService {
  private pastEvents = [{ title: 'Title1', start: '2021-07-22T08:54:00.282Z' }];
  private futureEvents = [
    { title: 'Title2', start: '2021-07-23T08:54:00.282Z' },
    { title: 'Title3', start: '2021-07-23T09:54:00.282Z' }
  ];
  getAllEvents(type: string): Observable<any> {
    if (type === 'past') {
      return of(this.pastEvents);
    } else {
      return of(this.futureEvents);
    }
  }
}

describe('AppComponent', function () {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EventListComponent,
        EventSummaryComponent
      ],
      providers: [
        {
          provide: ApiService,
          useClass: MockApiService
        }],
      imports: [HttpClientTestingModule]
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have past events`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.pastEvents.length).toEqual(1);
  });

  it(`should have future events`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.futureEvents.length).toEqual(2);
  });

  it('should render button for adding new event', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.btn')?.textContent).toContain('Add new event');
  });

});
