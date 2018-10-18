import { Injectable } from '@angular/core';
import { Items } from '../models/items';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
items: Items[];
  constructor() {
    this.items = [];
  }

  getItemsFromCart(): Observable<Items[]> {
    if (localStorage.getItem('cart') === null) {
      this.items = [];
    } else {
      this.items = JSON.parse(localStorage.getItem('cart'));
    }
    return of(this.items);
  }

    addItemToCart(product: Items) {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.items.unshift(product);
    localStorage.setItem('cart', JSON.stringify(this.items));
 }

addItemsToCart(products: Items[]) {
  localStorage.setItem('cart', JSON.stringify(products));
}


removeItemFromCart (product: Items) {
  const productsTemp = this.items.filter( value => {
    return product.name !== value.name; })
    .map(filteredValue => filteredValue);
    this.items = productsTemp;
    localStorage.setItem('cart', JSON.stringify(this.items));
}

noItemsInCart (products, cartState) {
if (products === undefined || products.length === 0) {
    cartState = !cartState; }
}

cartSubtotal () {

}

}
