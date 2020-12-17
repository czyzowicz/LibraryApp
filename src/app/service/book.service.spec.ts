import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checks if search starts when criteria are fulfilled', () => {
    service.titleSubject$.next('Lord of the rings');
    const url = service.buildUrl();

    expect(url).toBe('intitle:Lord of the rings');
  });
});
