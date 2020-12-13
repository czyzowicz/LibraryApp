import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookTitle: string;

  constructor() { }

  sendBookTitle () {
    console.log(this.bookTitle);    
  }



  ngOnInit(): void {
  }

}
