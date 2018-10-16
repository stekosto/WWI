import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/models/data';
import { DataService } from '../../services/data.service';
import { Items } from '../../models/items';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subcategories } from '../../models/subcategories';
import { map, flatMap, toArray } from 'rxjs/operators';
import { CompService } from '../../services/comp.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  data: Data[];
  subcategories: Subcategories[] = [];
  items: Items[] = [];
  products: Items[];
  product = {} as Items;
  productName: string;
  quantityValue: number;
  cartItems: Items[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private compService: CompService) {
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

  addToCart() {
    this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    this.cartItems.unshift(this.products[0]);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    console.log(this.products);
  }

  setQuantity(value) {
    // console.log(value);
  }


}


