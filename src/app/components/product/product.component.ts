import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/models/data';
import { DataService } from '../../services/data.service';
import { Items, CartItems } from '../../models/items';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subcategories } from '../../models/subcategories';
import { map, flatMap, toArray } from 'rxjs/operators';
import { CompService } from '../../services/comp.service';
import { CartService } from 'src/app/services/cart.service';
import objectFitImages from 'object-fit-images';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  data: Data[];
  subcategories: Subcategories[] = [];
  items: Items[] = [];
  products: CartItems[];
  product = {} as Items;
  productName: string;
  quantityValue: number = 1;
  cartItems: Items[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private compService: CompService,
    private cartService: CartService) {
    this.productName = this.route.snapshot.params['name'];
    // console.log(this.route.snapshot.params['name']);
    this.dataService.getData().pipe<Items[]>(
      flatMap(data => data),
      map(data => data.subcategories),
      flatMap(data => data),
      map(data => data.items),
      flatMap(data => data),
      toArray()).subscribe(incomingdata => {
        this.products = incomingdata;
        this.getProduct();
        // console.log(this.products);
        this.product = this.products[0];
      });
  }

  ngOnInit() {
    objectFitImages();
  }

  onBack() {
    this.compService.setShowItems(true);
    this.location.back();
  }

  getProduct() {
    this.products = this.products.filter(item => {
      // console.log(item);
      return item.name === this.productName;
    });
    return this.products ? this.products[0] : null;

  }

  addToCart(qvalue) {
  for (let i = 0; i < qvalue; i++) {
  this.cartService.addItemToCart(this.products[0]);
  console.log(this.quantityValue);
}
}

  setQuantity(value) {
    // console.log(value);
  }


}


