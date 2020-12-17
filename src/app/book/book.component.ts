import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookTitle: string;
  nameAuthor: string;
  publisher: string;
  ifLoadingData: boolean;
  booksResults: any[] = [];
  booksResultsSubject$: Subject<any>;
  titleSubject$: BehaviorSubject<string>;
  authorSubject$: BehaviorSubject<string>;
  publisherSubject$: BehaviorSubject<string>;
  loadingDataSubject$: BehaviorSubject<boolean>;

  constructor(
    private bookService: BookService
  ) {
    this.titleSubject$ = this.bookService.titleSubject$;
    this.authorSubject$ = this.bookService.authorSubject$;
    this.publisherSubject$ = this.bookService.publisherSubject$;
    this.booksResultsSubject$ = this.bookService.booksResultsSubject$;
    this.loadingDataSubject$ = this.bookService.loadingDataSubject$

    this.booksResultsSubject$.subscribe((res: any) => {
      this.booksResults = this.booksResults.concat(res.items);
      this.loadingDataSubject$.next(false);
    });
    
    this.loadingDataSubject$.subscribe((res: any) => {
      this.ifLoadingData = res;
    });

  }

  public onKeyUpTitle(): void {
    this.titleSubject$.next(this.bookTitle);
  }

  public onKeyUpAuthor(): void {
    this.authorSubject$.next(this.nameAuthor);
  }

  public onKeyUpPublisher(): void {
    this.publisherSubject$.next(this.publisher);
  }

  ngOnInit(): void {
  }

  public onScroll(): void {
    this.bookService.handle();
  }

}
