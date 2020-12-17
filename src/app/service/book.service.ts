import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, debounce, debounceTime, map, tap, throttle, throttleTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  titleSubject$: BehaviorSubject<string> = new BehaviorSubject('');
  authorSubject$: BehaviorSubject<string> = new BehaviorSubject('');
  publisherSubject$: BehaviorSubject<string> = new BehaviorSubject('');
  loadingDataSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  booksResultsSubject$: Subject<any> = new Subject();
  startIndex = 0;


  constructor(private http: HttpClient) {
    this.titleSubject$.pipe(
      debounceTime(2000)
    ).subscribe((val) => {
      this.handle();
    });
    this.authorSubject$.pipe(
      debounceTime(2000)
    ).subscribe((val) => {
       this.handle();
    });
    this.publisherSubject$.pipe(
      debounceTime(2000)
    ).subscribe((val) => {
      this.handle();
    });
  }

  public handle(): void {
    const url = this.buildUrl();
    if (url) {
      this.loadingDataSubject$.next(true);
      this.search(url).subscribe((res: any) => {
        this.booksResultsSubject$.next(res);
      });
    }
  }

  public search(url: string): Observable<any> {
    return this.http.get<any>(
      `https://www.googleapis.com/books/v1/volumes?q=${url}&startIntex=${this.startIndex}&maxResults=40`
    ).pipe(
      tap(() => {
        this.startIndex += 40;
      }),
      catchError(this.handleError)
    );
  }

  private buildUrl(): string {
    const criteria = [];
    if (this.titleSubject$.value) {
      criteria.push(`intitle:${this.titleSubject$.value}`);
    }
    if (this.authorSubject$.value) {
      criteria.push(`inauthor:${this.authorSubject$.value}`);
    }
    if (this.publisherSubject$.value) {
      criteria.push(`inpublisher:${this.publisherSubject$.value}`);
    }
    return criteria.join('+');
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
