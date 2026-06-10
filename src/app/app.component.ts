import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './services/book.service';
import {Book} from './model/book.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly bookService = inject(BookService);

  protected readonly books = signal<Book[]>([]);
  protected readonly loaded = signal(false);
  protected readonly loading = signal(false);
  protected readonly cartCount = signal(0);

  loadBooks(): void {
    if (this.loading()) return;

    this.loading.set(true);
    this.bookService.loadBooks().subscribe({
      next: (books) => {
        this.books.set(books);
        this.loaded.set(true);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  addToCart(_book: Book): void {
    this.cartCount.update((count) => count + 1);
  }
}
