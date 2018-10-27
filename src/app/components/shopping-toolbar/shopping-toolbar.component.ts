import { Component, OnInit } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { Subcategories } from '../../models/subcategories';
import { OfInTotal } from '../../models/of-in-total';

@Component({
  selector: 'app-shopping-toolbar',
  templateUrl: './shopping-toolbar.component.html',
  styleUrls: ['./shopping-toolbar.component.scss']
})
export class ShoppingToolbarComponent implements OnInit {
  inStock: boolean = false;
  selectedFilter: number;
  selectedOption: boolean = false;
  sortingValue: string = '1';
  options: Array<Object> = [
    { name: 'None', value: '1' },
    { name: 'Price', value: '2' },
    { name: 'Alphabetical', value: '3' },
    { name: 'Rating', value: '4' },
  ];
  products: Subcategories;
  catname: string;
  numberOfItems: OfInTotal;
  showItemValue: boolean = false;

  constructor(private compService: CompService) { }

  ngOnInit() {
    this.compService.selectProductName.subscribe(
      incProducts => {
        this.products = incProducts;
        this.catname = incProducts.name;
      }
    );

    this.compService.selectedItemOfItemInValue.subscribe(incNumberOfItems => {
      this.numberOfItems = incNumberOfItems;
    });

    this.compService.setStateShowItem.subscribe(incShowItemValue => {
      this.showItemValue = incShowItemValue;
    });

    this.compService.selectedSortingValue.subscribe(incValue => {
      this.sortingValue = incValue;
    });
  }

  getInStockValue(event) {
    this.compService.setFilterStockValue(event.target.checked);
  }

  getSortingValue(value: string) {
    this.compService.setSortingValue(value);
  }

}
