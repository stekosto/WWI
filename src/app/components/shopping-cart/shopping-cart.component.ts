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
  cartState = false;
  itemDeleted = true;
  @ViewChild('checkOutform') form: any;
  formValue: any;
  subtotal: number;
  shipping = 10.00;
  tax = 10.00;
  total: number;
  reduceVar: any;
  ArrayProduct: CartItems[];
  subTotalValue: number;
  totalValue: number;
  oldQuantity: number;

  constructor(private compService: CompService, private cartService: CartService) {}

  ngOnInit() {
    // get items from local Storage, get unique rows add quantity property
    this.getFromCart();
    // Calculate subtotal by multiply unit price * quantity, add a new property subtotal
    this.subTotal();
    this.emptyShoppingCart(); //  Check if cart is empty
  }

  ngOnChanges() {
    this.emptyShoppingCart();  //  Check if cart is empty
  }

  ngDoCheck() {
    this.subTotal();  // check for changes in quantity of products
  }

  emptyShoppingCart() {
    if (this.products === undefined || this.products.length === 0) {
      this.cartState = !this.cartState;
      console.log(this.cartState);
    }
  }

  // listen to user input and calculate total
  onAddToCart(product) {
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
  }

}
