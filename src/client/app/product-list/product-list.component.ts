import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: Array<Product>;

  constructor(public http: ApiService) { }

  ngOnInit() {
    this.loadData().subscribe((data) => {
      this.products = data;
    });
  }

  private loadData(): Observable<any> {
    return this.http.get('products');
  }
}
