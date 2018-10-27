import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Data } from 'src/app/models/data';
import { CompService } from '../../services/comp.service';
import { Subcategories } from '../../models/subcategories';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  data: Data[];
  isTrue = false;
  showitems = false;
  sortingValue: string = '1';
  inStock: boolean;
  selectedOption: boolean = false;

  constructor(private dataService: DataService, private compService: CompService) { }

  ngOnInit() {
    // get data from server
    this.dataService.getData().subscribe(incomingdata => {
      this.data = incomingdata;
    });
    // get current sorting value (1,2,3,4)
    this.compService.selectedSortingValue.subscribe(incSortValue => {
      this.sortingValue = incSortValue;
    });
    // get filter (in stock) value (true / false )
    this.compService.selectedFilteredStockValue.subscribe(incFilterStockValue => {
      this.inStock = incFilterStockValue;
    });
    this.compService.setSortingValue(this.sortingValue);
  }

  getSubcat(data: Data) {
    // show subcategories grid, get data
    this.compService.setShowItems(false);
    this.compService.setSubCat(data);
  }

  getProductName(subcategories: Subcategories) {
    // show product grid, get data initialize filtering/sorting values
    this.compService.setShowItems(true);
    this.compService.setSortingValue(this.sortingValue);
    this.compService.setFilterStockValue(this.inStock);
    this.compService.setProductName(subcategories);
  }

}
