import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="logo">Library</a>
      <ul class="nav-links">
        <li><a routerLink="/books">All Books</a></li>
        <li><a routerLink="/lists">My Favourite</a></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
