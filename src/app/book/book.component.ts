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

  constructor(
    private bookService: BookService
  ) {
    this.titleSubject$ = this.bookService.titleSubject$;
    this.authorSubject$ = this.bookService.authorSubject$;
    this.publisherSubject$ = this.bookService.publisherSubject$;
    this.booksResultsSubject$ = this.bookService.booksResultsSubject$;

    this.booksResultsSubject$.subscribe((res: any) => {
      this.booksResults = this.booksResults.concat(res.items);
      this.ifLoadingData = false;
    });

  }

  public onKeyUpTitle(): void {
    this.titleSubject$.next(this.bookTitle);
    this.ifLoadingData = true;
  }

  public onKeyUpAuthor(): void {
    this.authorSubject$.next(this.nameAuthor);
    this.ifLoadingData = true;
  }

  public onKeyUpPublisher(): void {
    this.publisherSubject$.next(this.publisher);
    this.ifLoadingData = true;
  }

  ngOnInit(): void {
  }

  public onScroll(): void {
    this.bookService.handle();
  }

}
