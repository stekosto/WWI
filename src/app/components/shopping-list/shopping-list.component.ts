import { Component, OnInit, DoCheck } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { Data } from '../../models/data';
import { Items } from '../../models/items';
import { Subcategories } from '../../models/subcategories';
import { OfInTotal } from '../../models/of-in-total';
import { CartService } from 'src/app/services/cart.service';
import objectFitImages from 'object-fit-images';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, DoCheck {
  data: Data[];
  subcategories: Subcategories[];
  items: Items[];
  item: Items;
  product: Items;
  products: Items[];
  showitems: boolean;
  copyItems: Items[] = [];
  filteringValue: boolean;
  filteredProducts: Items[] = [];
  numberOfItems: OfInTotal;
  sortingValue: string;

  constructor(private compService: CompService, private cartService: CartService) { }

  ngOnInit() {
    objectFitImages(); // fix object-fit for IE
    //  get showitems (show / hide this component)
    this.compService.setStateShowItem.subscribe(incomingstate => {
      if (incomingstate !== null) {
        this.showitems = incomingstate;
      }
    });

    this.numberOfItems = {
      current: null,
      total: null
    };
    // get data
    this.compService.selectProductName.subscribe(
      incomingsubcat => {
        if (incomingsubcat.items !== null) {
          this.items = incomingsubcat.items;
          this.copyItems = [...incomingsubcat.items];
        }
      });

    // get the sorting value (1,2,3,4)
    this.compService.selectedSortingValue.subscribe(value => {
      this.sortingValue = value;
    });

    //   get inStock filter value (true / false )
    this.compService.selectedFilteredStockValue.subscribe(incomingStockValue => {
      if (incomingStockValue !== null) {
        this.filteringValue = incomingStockValue;
      }
    });
  }

  ngDoCheck() {
    // check the sorting value
    this.sortBy(this.sortingValue);
  }

  sortBy(value) {
    if (value !== null && this.items !== undefined && this.copyItems !== undefined) {
      switch (value) {
        case '1':
          this.products = this.copyItems;
          break;
        case '2':
          let sortArrayByPrice: any;
          sortArrayByPrice = this.items.map((data, idx) => {
            return { idx: idx, data: data };
          });
          sortArrayByPrice.sort(this.sortByPrice);
          this.products = sortArrayByPrice.map(value2 => value2.data);
          break;
        case '3':
          let sortArrayByName: any;
          sortArrayByName = this.items.map((data, idx) => {
            return { idx: idx, data: data };
          });
          sortArrayByName.sort(this.sortByName);
          this.products = sortArrayByName.map(value2 => value2.data);
          break;
        case '4':
          let sortArrayByRating: any;
          sortArrayByRating = this.items.map((data, idx) => {
            return { idx: idx, data: data };
          });
          sortArrayByRating.sort(this.sortByRating);
          this.products = sortArrayByRating.map(value3 => value3.data);
          break;
      }
      this.filterBy();
    }
  }

  sortByName(item1, item2) {
    if (item1.data.name < item2.data.name) {
      return -1;
    } else if (item1.data.name > item2.data.name) { return 1; } else { return item1.idx - item2.idx; }
  }

  sortByRating(item1, item2) {
    if (item1.data.rating < item2.data.rating) {
      return 1;
    } else if (item1.data.rating > item2.data.rating) { return -1; } else { return item1.idx - item2.idx; }
  }

  sortByPrice(item1, item2) {
    if (item1.data.price < item2.data.price) {
      return -1;
    } else if (item1.data.price > item2.data.price) { return 1; } else { return item1.idx - item2.idx; }
  }

  filterBy() {
    if (this.filteringValue === true && this.products != null) {
      this.numberOfItems.total = this.products.length;
      this.filteredProducts = this.products.filter(this.filterbyStock).map(filteredValue => filteredValue);
      this.numberOfItems.current = this.filteredProducts.length;
    } else if (this.filteringValue === false && this.products != null) {
      this.numberOfItems.total = this.products.length;
      this.filteredProducts = this.products.filter(this.unfilterbyStock).map(filteredValue => filteredValue);
      this.numberOfItems.current = this.filteredProducts.length;
    }
    this.compService.setItemOfItemIn(this.numberOfItems);
  }

  filterbyStock(item: Items) {
    if (item.stock !== null && item.stock > 0) {
      return true;
    }
  }

  unfilterbyStock(item: Items) {
    if (item.stock !== null && item.stock >= 0) {
      return true;
    }
  }

  addToCart(item) {
    if (item.stock > 0) {
      this.cartService.addItemToCart(item);
      alert(`One ${item.name} added to Shopping Cart`);
    } else {
      alert(`Sorry ${item.name} is not in stock`);
    }
  }

}
