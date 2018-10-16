import { Component, OnInit } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { Items } from '../../models/items';

@Component({
  selector: 'app-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class CartComponent implements OnInit {
  items: any[];
  product: Items;
  products: Items[] = [];
  productsTemp: Items[] = [];
  totalPrice: number = null;
  productQuantity: number = null;
  setQuantity: number;
  ArrayQuantity: any[];
  cartState: Boolean = false;

  constructor(private compService: CompService) { }

  ngOnInit() {
    this.getFromCart();
    if (this.products === undefined || this.products.length === 0 ) {
      this.cartState = !this.cartState;
      console.log(this.cartState);
    }
}

addToCart (product: Items) {
  // this.products.push(product);
  // localStorage.setItem('products', JSON.stringify(this.products));
  // console.log('addToCart: ' +  this.products);
}

// get items from localStorage - drop the duplicates
getFromCart () {
  this.items = JSON.parse(localStorage.getItem('cart')) || [];

  this.productsTemp = this.items.reduce((unique, item) => {
    if (!unique.some(obj => obj.name === item.name && obj.name === item.name)) {
      console.log('some ' + item.name);
      unique.push(item);
    }
    return unique;
}, []);

// push the quantity property into each cart item object
this.getQuantity ();

}


getQuantity () {
  this.products = this.items.reduce((ar, item) => {
    let bool = false;
    if (!ar) {
      ar = [];
    }
    ar.forEach((a) => {
      if (a.name === item.name) {
        a.quantity++;
        bool = true;
      }
    });
    if (!bool) {
      item.quantity = 1;
      ar.push(item);
    }
    return ar;
  }, []);

console.log(this.products);
}


}
