import { Component, OnInit } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { Data } from '../../models/data';
import { Items } from '../../models/items';
import { Subcategories } from '../../models/subcategories';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  data: Data[];
  subcategories: Subcategories[];
  items: Items[];
  item: Items;
  showitems: boolean;
  sortingValue: string;
  itemProperty: string;
  copyItems: Items[] = [];
  copyItems2: Items[] = [];
  errorMessage: any;
  filteringValue: boolean;
  constructor(private compService: CompService) { }

  ngOnInit() {
    this.compService.selectedSubCat.subscribe(incomingdata => {
      if (incomingdata.category !== null) {
          this.subcategories = incomingdata.subcategories;
          // console.log(this.subcategories);
      }
    }
    );

    this.compService.selectProductName.subscribe(
    incomingsubcat => {
     if (incomingsubcat.items !== null)  {
    this.items = incomingsubcat.items;
    this.copyItems = [...this.items];
    // console.log(this.items);
    // console.log(this.copyItems);
    }
  });

    this.compService.setStateShowItem.subscribe(incomingstate => {
      if (incomingstate !== null) {
        this.showitems = incomingstate;
      }
    });

    this.compService.selectedFilteredStockValue.subscribe(incomingStockValue => {
      if (incomingStockValue !== null) {
        this.filteringValue = incomingStockValue;
        if (this.filteringValue === true && this.items != null) {
          this.items = this.items.filter(this.filterbyStock);
        } else if (this.filteringValue === false && this.items != null) {
          this.items = this.items;
        }
      }
    });

    this.compService.selectedSortingValue.subscribe(value => {
      if (value !== null && this.items !== undefined) {
          this.sortingValue = value;
          switch (value) {
          case '1':
          console.log(this.copyItems);
          this.itemProperty = 'none';
          // this.items = this.items.sort(this.sortByNone);
          this.items = this.copyItems;
          console.log(this.items);
          break;
          case '2':
          this.itemProperty = 'price';
          this.items = this.items.sort(this.sortByPrice);
          break;
          case '3':
          this.itemProperty = 'name';
          this.items = this.items.sort(this.sortByName);
          break;
          case '4':
          this.itemProperty = 'rating';
          this.items = this.items.sort(this.sortByRating);
          break;
        }
      }
    });
  }

sortByName (item1: Items, item2: Items ) {
  if (item1.name > item2.name) { return 1;
  } else if (item1.name === item2.name) { return 0; } else { return -1; }

}

sortByRating (item1: Items, item2: Items ) {
  if (item1.rating < item2.rating) { return 1;
  } else if (item1.rating === item2.rating) { return 0; } else { return -1; }

}

sortByPrice (item1: Items, item2: Items ) {
  if (item1.price > item2.price) { return 1;
  } else if (item1.price === item2.price) { return 0; } else { return -1; }

}

sortByNone (item1: Items, item2: Items ) {
  if (item1.stock === item2.stock) { return 1;
  } else if (item1.stock === item2.stock) { return 1; } else { return 1; }

}

filterbyStock (item: Items) {
  if (item.stock !== null && item.stock > 0 ) {
    return true;
  }
  }

}
