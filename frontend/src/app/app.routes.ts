import { Routes } from '@angular/router';

import {BookListComponent} from './components/book_list/book-list.component'
import {BookListsComponent} from './components/book_lists/book-lists.component'

export const routes: Routes = [
  { path: 'lists', component: BookListsComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/lists/:listId', component: BookListComponent },
  { path: '',   redirectTo: '/lists', pathMatch: 'full' },
  { path: '**', component: BookListsComponent },
];
