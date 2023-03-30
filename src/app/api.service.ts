import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './model/Event'
import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "http://localhost:3000";


  constructor(private httpClient: HttpClient) { }

  getAllEvents(type: string): Observable<any> {
    const params = { params: new HttpParams().set('type', type) };
    return this.httpClient.get<Event[]>(this.getUrl('events'), params)
      .pipe(
        catchError(this.handleError)
      );
  }

  getEventById(id: String): Observable<any> {
    const url = this.getUrl(`events/${id}`);
    console.log('Url', url)
    return this.httpClient.get<Event[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createEvent(event:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<Event>(this.getUrl('events'), event, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private getUrl(path: String) {
    return `${this.SERVER_URL}/${path}`;
  }

  /**
  * Handle HTTP error
  */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return observableThrowError(errMsg);
  }
}
