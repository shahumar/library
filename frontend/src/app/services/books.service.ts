import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, BookList } from '../types';
import { NotificationService } from './notification.service'

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'http://localhost:8000/api';
  private notificationService = inject(NotificationService)

  books = signal<Book[]>([]);
  bookLists = signal<BookList[]>([]);

  constructor(private http: HttpClient) {

    this.loadBookLists();
    this.loadAllBooks()
  }

  loadBooks(listId: number) {
    this.http.get<Book[]>(`${this.apiUrl}/books/load_books_by_list/?list_id=${listId}`).subscribe(
      books => this.books.set(books)
    );
  }

  loadAllBooks() {
    this.http.get<Book[]>(`${this.apiUrl}/books/`).subscribe(
      books => this.books.set(books)
    );
  }

  loadBookLists() {
    this.http.get<BookList[]>(`${this.apiUrl}/lists/`).subscribe(
      lists => this.bookLists.set(lists)
    );
  }

  createList(name: string) {
    return this.http.post<BookList>(`${this.apiUrl}/lists/`, { name }).subscribe(
      {
        next: (newList) => {
          this.bookLists.update(lists => [...lists, newList])
          this.notificationService.showSuccess('List created successfully!');
        },
        error: () => {
          this.notificationService.showError('Failed to create!');
        }
      }

    );
  }

  deleteList(id: number) {
    return this.http.delete(`${this.apiUrl}/lists/${id}`).subscribe(
      {
        next: () => {
          this.bookLists.update(lists => lists.filter(l => l.id !== id))
          this.notificationService.showSuccess('Deleted successfully!');
        },
        error: () => {
          this.notificationService.showError('Failed to delete!');
        }
      }
    );
  }

  createBookAndAssignToFavourites(listId: number, title: string, author: string, year: string) {
    return this.http.post(`${this.apiUrl}/books/add_book_to_list/`, {
      list_id: listId, title: title, author: author, year: year })
      .subscribe(
        {
          next: () => {
             this.loadBookLists()
             this.notificationService.showSuccess('Assigned successfully!');
          },
          error: () => {
            this.notificationService.showError('Failed to create!');
          }

        }
      );
  }

  createBook(title: string, author: string, year: string) {
    return this.http.post(`${this.apiUrl}/books/`, {
      title: title, author: author, year: year })
      .subscribe(
        {
          next: () => {
             this.loadAllBooks()
             this.notificationService.showSuccess('Created successfully!');
          },
          error: () => {
            this.notificationService.showError('Failed to create!');
          }

        }
      );
  }

  addBookToList(listId: number, bookId: number) {
    return this.http.post(`${this.apiUrl}/lists/${listId}/add_book/`, { book_id: bookId })
      .subscribe(
      {
         next: () => {
             this.loadBookLists();
             this.notificationService.showSuccess('successfully Added!');
          },
          error: () => {
            this.notificationService.showError('Failed to create!');
          }

      });
  }

  removeBookFromList(listId: number, bookId: number) {
    return this.http.post(`${this.apiUrl}/lists/${listId}/remove_book/`, { book_id: bookId })
      .subscribe({
        next: () => {
           this.loadBooks(listId);
           this.notificationService.showSuccess('successfully removed!');
        },
        error: () => {
          this.notificationService.showError('Failed to remove!');
        }
      });
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/books/${id}`).subscribe(
      {
        next: () => {
          this.books.update(books => books.filter(l => l.id !== id))
          this.notificationService.showSuccess('Deleted successfully!');
        },
        error: () => {
          this.notificationService.showError('Failed to delete!');
        }
      }
    );
  }
}
