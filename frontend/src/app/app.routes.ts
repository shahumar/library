import { Routes } from '@angular/router';

import {BookListComponent} from './components/books/book-list.component'
import {FavoriteBooksComponent} from './components/favorites/favorite-books.component'

export const routes: Routes = [
  { path: 'lists', component: FavoriteBooksComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/lists/:listId', component: BookListComponent },
  { path: '',   redirectTo: '/lists', pathMatch: 'full' },
  { path: '**', component: FavoriteBooksComponent },
];
