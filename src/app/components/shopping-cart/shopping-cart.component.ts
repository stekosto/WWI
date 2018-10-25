import { Component, OnInit, OnChanges, ViewChild, DoCheck, AfterViewInit, ElementRef } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { Items, CartItems } from '../../models/items';
import { CartService } from 'src/app/services/cart.service';
import { ReadFromInjectorFn } from '@angular/core/src/render3/di';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges, DoCheck, AfterViewInit {
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
  // @ViewChild('inputSubTotal') inputSubTotal: ElementRef;
  formValue: any;
  subtotal: number;
  shipping: number = 10.00;
  tax: number = 10.00;
  total: number = 10.00;
  reduceVar: any;
  ArrayProduct: CartItems[];
  subTotalValue: number;
  totalValue: number;
  oldQuantity: number;

  constructor(private compService: CompService, private cartService: CartService) { }

  ngOnInit() {
    this.getFromCart();
    this.subTotal();
    this.emptyShoppingCart();
    console.log(this.ArrayProduct);
  }

  ngOnChanges() {
    this.emptyShoppingCart();
  }

  ngDoCheck() {
    this.subTotal();
  }

  ngAfterViewInit() {
    //  this.inputSubTotal.nativeElement.value = this.subTotalValue;

  }

  emptyShoppingCart() {
    if (this.products === undefined || this.products.length === 0) {
      this.cartState = !this.cartState;
      console.log(this.cartState);
    }
  }

  onAddToCart(product) {
    console.log('onAddToCart() in shopping-cart.component STARTS');
    const tempArrayProduct2 = this.ArrayProduct.map(obj => {
      const rObj = {} as CartItems;
      rObj.name = obj.name;
      rObj.price = obj.price;
      rObj.quantity = product.quantity;
      rObj.subtotal = obj.price * obj.quantity;
      return rObj;
    });
    this.ArrayProduct = tempArrayProduct2;
    this.subTotalValue = tempArrayProduct2.reduce((accu, item) => accu + item.subtotal, 0);
    this.totalValue = (this.subTotalValue + this.shipping) + (this.subTotalValue + this.shipping) * this.tax * 0.01;
    console.log(tempArrayProduct2);
    console.log('onAddToCart() in shopping-cart.component ENDS');
  }

  OnRemoveFromCart(product) {
    if (confirm(`You are about to remove ${product.name} from Shopping Cart`)) {
    this.ArrayProduct.forEach((curr) => {
      if (curr.name = product.name) {
          curr.quantity = 0;
      }
    });
    this.subTotalValue = this.ArrayProduct.reduce((accu, item) => accu + item.subtotal, 0);
    this.totalValue = (this.subTotalValue + this.shipping) + (this.subTotalValue + this.shipping) * this.tax * 0.01;
    this.cartService.removeItemFromCart(product);
    this.getFromCart();
    this.emptyShoppingCart();
  }
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
          a.subtotal = a.quantity * a.price;
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

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      console.log('Form is not valid');
    } else {
      this.formValue = JSON.stringify(value, null, 3);
      alert(
        this.formValue
      );
    }
  }

  subTotal() {
    const tempArrayProduct = this.products.map(obj => {
      const rObj = {} as CartItems;
      rObj.name = obj.name;
      rObj.price = obj.price;
      rObj.quantity = obj.quantity;
      rObj.subtotal = obj.price * obj.quantity;
      return rObj;
    });
    this.ArrayProduct = tempArrayProduct;
    this.subTotalValue = tempArrayProduct.reduce((accu, item) => accu + item.subtotal, 0);
    this.totalValue = (this.subTotalValue + this.shipping) + (this.subTotalValue + this.shipping) * this.tax * 0.01;
    // console.log(tempArrayProduct);
    // console.log(this.subTotalValue);
  }

}
