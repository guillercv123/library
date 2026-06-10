import {Component, inject, signal} from '@angular/core';
import {BookService} from '../../services/book.service';
import {DecimalPipe} from '@angular/common';
import {Book} from '../../models/book.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly bookService = inject(BookService);

  protected readonly books = signal<Book[]>([]);
  protected readonly loaded = signal(false);
  protected readonly loading = signal(false);

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
    this.bookService.addToCart(_book);
  }
}
