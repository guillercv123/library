import {Injectable, signal} from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {Book} from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  public cartCount = signal(0);

  loadBooks(): Observable<Book[]> {
    const books: Book[] = [
      { id: 1, name: 'Rama II',         author: 'Arthur C. Clarke', pages: 281, price: 44.23 },
      { id: 2, name: 'Exhalation',      author: 'Ted Chiang',       pages: 556, price: 50.99 },
      { id: 3, name: 'Traffic Secrets', author: 'Russell Brunson',  pages: 306, price: 18.97 },
      { id: 4, name: 'Clean Code',      author: 'Robert Martin',    pages: 464, price: 87.00 },
    ];

    return of(books).pipe(delay(600));
  }

  addToCart(_book: Book): void {
    this.cartCount.update((count) => count + 1);
  }
}
