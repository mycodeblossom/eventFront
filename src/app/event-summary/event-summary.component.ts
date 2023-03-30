import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Event } from '../model/Event';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {
  @Input() event: Event = { title: '', description: '', start: '', _id: '' };

  title: string = '';
  date: String = '';
  time: String = '';

  eventViewed = { title: '', description: '', startDate: '', startTime: '' }

  closeModal: string;

  constructor(private apiService: ApiService, private modalService: NgbModal) {
    this.closeModal = '';
  }

  ngOnInit(): void {
    this.title = this.event.title;
    const start: string = this.event.start;

    this.date = this.getDate(start);
    this.time = this.getTime(start);
  }

  viewEvent(content: any) {
    const id = this.event['_id'];
    this.apiService.getEventById(id)
      .subscribe(
        data => {
          console.log(data);
          this.eventViewed = {
            title: data.title,
            description: data.description,
            startDate: this.getDate(data.start),
            startTime: this.getTime(data.start)
          };
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        },
        error => console.log('Error in server request for future events')
      );
  }

  private getDate(date: string) {
    const startDate = new Date(date);
    const result = `${startDate.getDate()}/${startDate.getMonth() + 1}`;
    return result;
  }

  private getTime(date: string) {
    const startDate = new Date(date);
    const add0 = (num: number) => `0${num}`.slice(-2);
    const result = `${add0(startDate.getHours())}:${add0(startDate.getMinutes())}`;
    return result;
  }

}
