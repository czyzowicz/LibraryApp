import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooksByTitle(bookTitle:string): Observable<any> {
    return this.http.get<any>(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}`
    ).pipe(
      catchError(this.handleError)
    );
  }
  
  getBooksByAuthor(nameAuthor:string): Observable<any> {
    return this.http.get<any>(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${nameAuthor}`
    ).pipe(
      catchError(this.handleError)
    );
  }
  
  getBooksByPublisher(publisher:string): Observable<any> {
    return this.http.get<any>(`https://www.googleapis.com/books/v1/volumes?q=inpublisher:${publisher}`
    ).pipe(
      catchError(this.handleError)
    );
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