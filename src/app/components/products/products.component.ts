import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(public productService: ProductsService) {
    this.#fetchProduct();
  }

  #fetchProduct() {
    this.productService
      .getProducts()
      .pipe(
        map((d: any) => {
          this.productService.products$.next(d.products);
          this.productService.total$.next(d.total);
          this.productService.totalPage$.next(
            d.total / this.productService.pageSize$.value
          );
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  onSearch(token: string) {
    this.productService.searchToken$.next(token);
    this.#fetchProduct();
  }

  onFirst() {
    this.productService.currentPage$.next(0);
    this.#fetchProduct();
  }

  onPrev() {
    this.productService.currentPage$.next(
      this.productService.currentPage$.value - 1
    );
    this.#fetchProduct();
  }

  onNext() {
    this.productService.currentPage$.next(
      this.productService.currentPage$.value + 1
    );
    this.#fetchProduct();
  }

  onLast() {
    this.productService.currentPage$.next(
      this.productService.totalPage$.value - 1
    );
    this.#fetchProduct();
  }
}
