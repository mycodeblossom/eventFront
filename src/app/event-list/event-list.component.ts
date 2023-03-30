import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../model/Event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() events: Event[] = [];

  constructor() { }

  ngOnInit(): void {  }

}
