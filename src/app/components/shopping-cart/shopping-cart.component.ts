import { Component, OnInit, OnChanges, ViewChild, DoCheck } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { Items, CartItems } from '../../models/items';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges, DoCheck {
  items: any[];
  product: Items;
  products: CartItems[] = [];
  productsTemp: Items[] = [];
  totalPrice: number = null;
  productQuantity: number = null;
  setQuantity: number;
  ArrayQuantity: any[];
  cartState: boolean = false;
  itemDeleted: boolean = true;
  @ViewChild('checkOutform') form: any;
  formValue: any;
  subtotal: number = 5.00;
  shipping: number = 10.00;
  tax: number = 3.00;
  total: number = 10.00;
  reduceVar: any;
  oldQuantity: number;

  constructor(private compService: CompService, private cartService: CartService) { }

  ngOnInit() {
    this.getFromCart();
    this.emptyShoppingCart();
  }

  ngOnChanges() {
    // console.log('ngOnChanges remalaka');
  }

  ngDoCheck() {
    // this.emptyShoppingCart();
    // console.log('ngDoCheck remalaka');
  }

 emptyShoppingCart() {
    if (this.products === undefined || this.products.length === 0) {
      this.cartState = !this.cartState;
      console.log(this.cartState);
    }
  }

  onAddToCart(product) {
    console.log('onAddToCart() in shopping-cart.component STARTS');
    this.products.forEach((currentItem) => {
      if (currentItem.name === product.name) {
        return this.oldQuantity = currentItem.quantity;
      }
    });

    console.log('onAddToCart() in shopping-cart.component ENDS');
  }

  OnRemoveFromCart(product) {
    this.cartService.removeItemFromCart(product);
    this.getFromCart();
    this.emptyShoppingCart();
    console.log(this.cartService);
  }

  getFromCart() {
    this.cartService.getItemsFromCart().subscribe(incItems => {
      this.items = incItems;
      this.getQuantity();
    });
  }

  getQuantity() {
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
