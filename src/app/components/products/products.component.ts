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
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  onSearch(token: string) {
    this.productService.searchToken$.next(token);
    this.#fetchProduct();
  }
}
