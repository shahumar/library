import { Component, inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="books-container">
      <div class="head">
        <h2>Available Books</h2>
        @if(!listId) {
        <div class="create-list">
          <input
            type="text"
            [(ngModel)]="title"
            placeholder="Enter Title"
            class="list-input"
          >
          <input
            type="text"
            [(ngModel)]="author"
            placeholder="Author"
            class="list-input"
          >
          <input
            type="text"
            [(ngModel)]="year"
            placeholder="Year"
            class="list-input"
          >
          <button (click)="createBook()" class="create-button">Create Book</button>
        </div>
        }
      </div>
      <div class="tail">
        <div class="books-grid">
          @for (book of booksService.books(); track book.id) {
            <div class="book-card" >
              <h3>{{ book.title }}</h3>
              <button (click)="deleteBook(book.id)" class="delete-button">Delete</button>
              <p class="author">By {{ book.author }}</p>
              <p class="year">{{ book.year }}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  listId?: number;
  title: string = "";
  author: string = "";
  year: string = "";

  booksService = inject(BooksService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const list_id = params.get('listId')
      if (list_id != undefined) {
        this.listId =  Number(params.get('listId'));
        this.booksService.loadBooks(this.listId);
      }else {
        this.booksService.loadAllBooks()
      }

    });
  }


  createBook() {
    if (this.title.trim() && this.author.trim() && this.year.trim()) {
      if (this.listId != undefined) {
        this.booksService.createBookAndAssignToFavourites(this.listId, this.title, this.author, this.year);

      }else {
        this.booksService.createBook(this.title, this.author, this.year)
      }
      this.title = '';
      this.author = '';
      this.year = '';
    }

  }

  deleteBook(id: number) {
    this.booksService.deleteBook(id);
  }
}
