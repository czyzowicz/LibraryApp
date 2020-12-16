import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookTitle: string;
  nameAuthor: string;
  publisher: string;
  booksResults: [];

  constructor(private bookService: BookService) { }

  searchBookByTitle() {
    let wordSearch = this.bookTitle;
    setTimeout(() => {
      if (wordSearch == this.bookTitle) {
        if (this.bookTitle) {
          this.bookService.getBooksByTitle(this.bookTitle)
            .subscribe(data => {
              this.booksResults = data.items, 
                console.log(this.booksResults);
            })
        } else {
          console.log('nothing happened');
        }
      }
    }, 2000);
  }  
  
  searchBookByAuthor() {
    let wordSearch = this.nameAuthor;
    setTimeout(() => {
      if (wordSearch == this.nameAuthor) {
        if (this.nameAuthor) {
          this.bookService.getBooksByAuthor(this.nameAuthor)
            .subscribe(data => {
              this.booksResults = data.items, 
                console.log(this.booksResults);
            })
        } else {
          console.log('nothing happened');
        }
      }
    }, 2000);
  } 
  
  searchBookByPublisher() {
    let wordSearch = this.publisher;
    setTimeout(() => {
      if (wordSearch == this.publisher) {
        if (this.publisher) {
          this.bookService.getBooksByPublisher(this.publisher)
            .subscribe(data => {
              this.booksResults = data.items, 
                console.log(this.booksResults);
            })
        } else {
          console.log('nothing happened');
        }
      }
    }, 2000);
  }

  ngOnInit(): void {
  }

}
