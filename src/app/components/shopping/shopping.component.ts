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
  inStock: boolean = false;
  showitems = false;
  selectedFilter: number;
  selectedOption: boolean = false;
  options: Array<Object> = [
    {name: 'None', value: '1'} ,
    {name: 'Price', value: '2'},
    {name: 'Alphabetical', value: '3'},
    {name: 'Rating', value: '4'},
  ];

  constructor(private dataService: DataService, private compService: CompService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(incomingdata => {
      this.data = incomingdata;
    });
  }

  getSubcat(data: Data) {
    this.compService.setSubCat(data);
    this.compService.setShowItems(false);
  }

  getProductName(subcategories: Subcategories) {
    this.compService.setProductName(subcategories);
    this.compService.setShowItems(true);
  }

  getInStock(value: boolean)  {
    this.compService.setFilterStockValue(value);
  }

  getSortingValue(value: string) {
  this.compService.setSortingValue(value);
  }

}
