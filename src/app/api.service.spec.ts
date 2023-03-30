import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ApiService);

    injector = getTestBed();
    service = injector.inject(ApiService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllEvents with input past should return data', () => {
    const dummyResponse = [{title:'Title', start:'2021-07-22T08:54:00.282Z'}]
    service.getAllEvents('past').subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/events?type=past');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  afterEach(() => {
    httpMock.verify();
  }); 
});
