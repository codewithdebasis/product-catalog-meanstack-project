import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Product } from '../shared/product.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  loading: Boolean = false;
  newProduct: Product;

  constructor(public http: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    debugger;
    const formValues = Object.assign({}, form.value);

    const product: Product = {
      itemName: formValues.itemName,
      category: formValues.category,
      price: formValues.price,
      quantity:formValues.quantity,
      isStockAvailable: formValues.quantity>0 ? true : false,
      photoUrl: formValues.photo
    };

    this.http.post("products", product)
      .subscribe((res) => {
        form.reset();
        this.loading = false;
        this.newProduct = res;
      });    
  }
}
