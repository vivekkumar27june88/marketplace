import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  pageSize$ = new BehaviorSubject<number>(5);
  currentPage$ = new BehaviorSubject<number>(0);
  total$ = new BehaviorSubject<number>(0);
  searchToken$ = new BehaviorSubject<string>('');
  products$ = new BehaviorSubject<ProductModel[]>([]);

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    const search = this.searchToken$.value.trim();

    const url = search
      ? `https://dummyjson.com/products/search`
      : `https://dummyjson.com/products`;

    return this.httpClient.get(url, {
      params: { limit: this.pageSize$.value, ...(search && { q: search }) },
    });
  }
}
