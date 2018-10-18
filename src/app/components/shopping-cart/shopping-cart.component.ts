import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { Items } from '../../models/items';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {
  items: any[];
  product: Items;
  products: Items[] = [];
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
    // this.getProductQuantity();
  }

  ngOnChanges() {
    this.emptyShoppingCart();
  }


  // getProductQuantity() {
  //   const sum = this.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 1);
  //   console.log(this.items);
  //   console.log(sum);
  // }

 emptyShoppingCart() {
    if (this.products === undefined || this.products.length === 0) {
      this.cartState = !this.cartState;
      console.log(this.cartState);
    }
  }

  // onAddToCart(product, qvalue, name, ) {
  //   this.cartService.removeItemFromCart(product);
  //   for (let i = 0; i < qvalue; i++) {
  //     this.cartService.addItemToCart(product);
  //     console.log(product.quantity);
  //   }
  //   this.getFromCart();
  //   console.log(qvalue);
  //   console.log(name);
  //   console.log(this.products);
  // }

  onAddToCart(product) {
    console.log(product);
    this.products.forEach((currentItem) => {
      if (currentItem.name === product.name) {
        return this.oldQuantity = currentItem.quantity;
      }
    });

    console.log(this.oldQuantity);
    // let item = <Items>{};
    // item = product;
    // console.log(this.products);

    // for (let i = 0; i < qvalue; i++) {
    //   this.cartService.addItemToCart(product);
    //   console.log(product.quantity);
    // }
    // this.getFromCart();
    // console.log(qvalue);
    // console.log(name);
    // console.log(this.products);
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



    //  const productsTemp = this.items.filter( value => {
    //    return item.name !== value.name; })
    //    .map(filteredValue => filteredValue);
    // this.items.forEach((current, index) => {
    //   if (cartItem.name === current.name) {
    //     this.items.splice(index, 1);
    //   }
    // });
    // console.log(productsTemp);
    // this.items = productsTemp;
    // localStorage.setItem('cart', JSON.stringify(this.items));
    // console.log(productsTemp);
  

  // get items from localStorage - drop the duplicates
  
  // if (localStorage.getItem('cart') === null) {
  //   this.items = [];
  // } else {
  //   this.items = JSON.parse(localStorage.getItem('cart'));
  // }
  // this.items = JSON.parse(localStorage.getItem('cart')) || [];

  // this.productsTemp = this.items.reduce((unique, item) => {
  //   if (!unique.some(obj => obj.name === item.name && obj.name === item.name)) {
  //     console.log('some ' + item.name);
  //     unique.push(item);
  //   }
  //   return unique;
  // }, []);

  // this.getQuantity();

  // }

  // create an array only from unique items of the localstorage array >> this.items ('cart')
  // push the quantity property into each cart item object

}
