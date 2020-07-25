import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  @HostBinding('class') columnClass = 'four wide column';

  constructor() { }

  ngOnInit() {
  }

}
