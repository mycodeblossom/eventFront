import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSummaryComponent } from './event-summary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventSummaryComponent', function(){
  let component: EventSummaryComponent;
  let fixture: ComponentFixture<EventSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSummaryComponent ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSummaryComponent);
    component = fixture.componentInstance;
    component.event = {title:'Event title 1', start: '2021-07-22T08:54:00.282Z', _id: 'sjdkfhkjsdjfs'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component.title).toEqual('Event title 1');
  });

  it('should have correct date', () => {
    expect(component.date).toEqual('22/7');
  });

  it('should have correct date displayed', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card')?.textContent).toContain('22/7');
  });
});
