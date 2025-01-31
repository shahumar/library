import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book, BookList } from '../../types';

@Component({
  selector: 'app-book-lists',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="lists-container">
      <div class="head">
        <h2>Create Favourite list</h2>

        <div class="create-list">
          <input
            type="text"
            [(ngModel)]="newListName"
            placeholder="Enter list name"
            class="list-input"
          >
          <button (click)="createList()" class="create-button">Create List</button>
        </div>
      </div>
      <div class="tail">
        <div class="lists">
        @for (list of booksService.bookLists(); track list.id) {
          <div class="list-card">
            <div class="list-header">
              <h3><a [routerLink]="['/books/lists/', list.id]">{{ list.name }}</a></h3>
              <button (click)="deleteList(list.id)" class="delete-button">Delete</button>
            </div>

            <div class="book-selector">
              <select [(ngModel)]="selectedBooks[list.id]" class="book-select">
                <option value="">Select a book to add</option>
                @for (book of availableBooks(list); track book.id) {
                  <option [value]="book.id">{{ book.title }}</option>
                }
              </select>
              <button
                (click)="addBookToList(list.id)"
                [disabled]="!selectedBooks[list.id]"
                class="add-button"
              >
                Add Book
              </button>
            </div>
          </div>
        }
      </div>
      </div>
    </div>
  `,
  styleUrls: ['./book-lists.component.scss'],
})
export class BookListsComponent {
  booksService = inject(BooksService);
  newListName = '';
  selectedBooks: Record<number, string> = {};

  availableBooks(list: BookList) {
    return this.booksService.books().filter(
      book => !list.books.find((b: Book) => b.id === book.id)
    );
  }

  createList() {
    if (this.newListName.trim()) {
      this.booksService.createList(this.newListName);
      this.newListName = '';
    }
  }

  deleteList(id: number) {
    this.booksService.deleteList(id);
  }

  addBookToList(listId: number) {
    const bookId = Number(this.selectedBooks[listId]);
    if (bookId) {
      this.booksService.addBookToList(listId, bookId);
      this.selectedBooks[listId] = '';
    }
  }

  removeBookFromList(listId: number, bookId: number) {
    this.booksService.removeBookFromList(listId, bookId);
  }
}
