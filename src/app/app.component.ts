import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { Event } from './model/Event';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  futureEvents: Event[] = [];
  pastEvents: Event[] = [];

  eventTitle: string = 'Test';
  eventDescription: string = 'Lal la';
  startDate :{day:number, month: number, year: number};
  time: NgbTimeStruct ;

  private subscriptionPastEvents: Subscription = new Subscription;
  private subscriptionFutureEvents: Subscription = new Subscription;

  constructor(private apiService: ApiService, private modalService: NgbModal) {
    this.loadEvents();
    const date = new Date();
    this.startDate = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
    this.time = {hour: date.getHours(), minute: date.getMinutes(), second:0};
  }

  ngOnInit(): void {
    // this.loadEvents();
  }

  ngOnDestroy() {
    this.subscriptionPastEvents.unsubscribe();
    this.subscriptionFutureEvents.unsubscribe();
  }

  onCreate(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (result) {
            console.log('Create');
            const newEvent = {
              title: this.eventTitle,
              description: this.eventDescription,
              start: new Date(this.startDate.year, this.startDate.month-1, this.startDate.day, this.time.hour, this.time.minute, 0)
            }
            console.log('New event', newEvent);
            this.apiService.createEvent(newEvent).subscribe(data => {
              console.log(data);
              this.loadEvents();
            })
          }

        }
      );

  }

  private loadEvents() {
    this.subscriptionFutureEvents = this.apiService.getAllEvents('future')
      .subscribe(
        data => {
          this.futureEvents = data;
        },
        error => {
          // this.futureEvents = [{ title: "Test", description: "la la la", start: "2021-07-21T09:29:13.000Z", _id: '' }];
          console.log('Error in server request for future events');
        }
      );
    this.subscriptionPastEvents = this.apiService.getAllEvents('past')
      .subscribe(
        data => {
          this.pastEvents = data
        },
        error => {
          // this.pastEvents = [{ title: "Test", description: "la la la", start: "2021-07-21T09:29:13.000Z", _id: '' }];
          console.log('Error in server request for past events');
        }
      );
  }
}
