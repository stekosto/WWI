import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Data } from 'src/app/models/data';
import { CompService } from '../../services/comp.service';
import { Subcategories } from '../../models/subcategories';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, OnChanges, DoCheck {
  data: Data[];
  isTrue = false;
  showitems = false;
  sortingValue: string = '1';
  inStock: boolean;

  constructor(private dataService: DataService, private compService: CompService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(incomingdata => {
      this.data = incomingdata;
    });

    this.compService.selectedSortingValue.subscribe(incSortValue => {
      this.sortingValue = incSortValue;
      // console.log('incSortValue: ' + incSortValue);
      // console.log('sortingValue: ' + this.sortingValue);
    });
    this.compService.selectedFilteredStockValue.subscribe(incFilterStockValue => {
      this.inStock = incFilterStockValue;
      // console.log('incFilterStockValue ' + incFilterStockValue);
      // console.log('inStock: ' + this.inStock);
    });

    this.compService.setSortingValue(this.sortingValue);

  }

  ngDoCheck() {
  }

  ngOnChanges() {

  }

  getSubcat(data: Data) {
    // this.showitems = false;
    this.compService.setShowItems(false);
    this.compService.setSubCat(data);
    console.log('showite shopping.comp: ' + this.showitems);
  }

  getProductName(subcategories: Subcategories) {
    console.log('gerProductName() in shopping.component STARTS');
    this.compService.setShowItems(true);
    this.compService.setSortingValue(this.sortingValue);
    this.compService.setFilterStockValue(this.inStock);
    this.compService.setProductName(subcategories);
    console.log('gerProductName() in shopping.component ENDS');
  }

}
