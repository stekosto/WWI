import { Component, OnInit, OnChanges } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { Data } from '../../models/data';
import { Items } from '../../models/items';
import { Subcategories } from '../../models/subcategories';
import { OfInTotal } from '../../models/of-in-total';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnChanges {
  data: Data[];
  subcategories: Subcategories[];
  items: Items[];
  item: Items;
  product: Items;
  products: Items[];
  showitems: boolean;
  sortValue: string;
  itemProperty: string;
  copyItems: Items[] = [];
  copyItems2: Items[] = [];
  errorMessage: any;
  filteringValue: boolean;
  filteredProducts: Items[] = [];
  numberOfItems: OfInTotal;
  constructor(private compService: CompService) { }

  ngOnInit() {
    this.compService.setStateShowItem.subscribe(incomingstate => {
      if (incomingstate !== null) {
        this.showitems = incomingstate;
        console.log('sh-list: ' + this.showitems);
      }
    });

    this.numberOfItems = {
      current: null,
      total: null
    };
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
    this.copyItems = [...incomingsubcat.items];
    // console.log('this.items: ');
    console.log('this.copyItems');
    console.log(this.copyItems);
    }
  });


    this.compService.selectedFilteredStockValue.subscribe(incomingStockValue => {
      if (incomingStockValue !== null) {
        this.filteringValue = incomingStockValue;
        this.filterBy();
        // if (this.filteringValue === true && this.items != null) {
        //   this.items = this.items.filter(this.filterbyStock);
        // } else if (this.filteringValue === false && this.items != null) {
        //   this.items = this.copyItems;
        // }
      }
    });

    this.compService.selectedSortingValue.subscribe(value => {
      this.sortBy(value);
    });

  }


ngOnChanges () {

}


sortBy (value) {
  if (value !== null && this.items !== undefined) {
    // console.log('sortValue b4 switch: ' + value);
    switch (value) {
    case '1':
    this.products = this.copyItems;
    // this.products = this.items.sort(this.sortByNone);
    // this.items = this.copyItems;
    console.log('filter none filteredProducts' + this.products);
    this.filterBy();
    break;
    case '2':
    this.itemProperty = 'price';
    this.products = this.items.sort(this.sortByPrice).map(value2 => value2);
    // const sortedItems = Object.assign({}, value); // copies value
    // return this.product = sortedItems;
    // this.items = this.items.sort(this.sortByPrice);
    this.filterBy();
    break;
    case '3':
    this.itemProperty = 'name';
    this.products = this.items.sort(this.sortByName).map(value3 => value3);
    this.filterBy();
    break;
    case '4':
    this.itemProperty = 'rating';
    this.products = this.items.sort(this.sortByRating).map(value4 => value4);
    this.filterBy();
    break;
  }
}
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

// sortByNone (item1: Items, item2: Items ) {
//   if (item1.stock = item2.stock) { return 1;
//   } else if (item1.stock === item2.stock) { return 1; } else { return 1; }

// }

filterBy () {
  if (this.filteringValue === true && this.products != null) {
    this.numberOfItems.total = this.products.length;
    this.filteredProducts = this.products.filter(this.filterbyStock).map(filteredValue => filteredValue);
    this.numberOfItems.current = this.filteredProducts.length;
    // console.log(this.numberOfItems.total + ' InStock: ' + this.numberOfItems.current);
  } else if (this.filteringValue === false && this.products != null) {
    // fliteredProducts = this.products.map(filteredValue => filteredValue);
    // this.products = fliteredProducts;
    this.numberOfItems.total = this.products.length;
    this.filteredProducts = this.products.filter(this.unfilterbyStock).map(filteredValue => filteredValue);
    this.numberOfItems.current = this.filteredProducts.length;
    // console.log(this.numberOfItems.total + ' non In Stock: ' + this.numberOfItems.current);
    // console.log(this.numberOfItems);
  }
  this.compService.setItemOfItemIn(this.numberOfItems);
  console.log('filteredProducts');
  console.log(this.filteredProducts);
}

filterbyStock (item: Items) {
  if (item.stock !== null && item.stock > 0 ) {
    return true;
    }
  }

unfilterbyStock (item: Items) {
    if (item.stock !== null && item.stock >= 0 ) {
      return true;
    }
  }

}
