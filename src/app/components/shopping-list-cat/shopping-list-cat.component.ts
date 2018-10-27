import { Component, OnInit } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { DataService } from '../../services/data.service';
import { Subcategories } from '../../models/subcategories';
import { map, flatMap, toArray } from 'rxjs/operators';
import objectFitImages from 'object-fit-images';

@Component({
  selector: 'app-shopping-list-cat',
  templateUrl: './shopping-list-cat.component.html',
  styleUrls: ['./shopping-list-cat.component.scss']
})
export class ShoppingListCatComponent implements OnInit {
  // @Input() showitems: boolean;
  showitems: boolean;
  subcategories: Subcategories[] = [];
  allSubcat: Subcategories[];
  subcat: Subcategories[];
  sortingValue: string;
  filteringValue: boolean;
  constructor(private dataService: DataService, private compService: CompService) { }

  ngOnInit() {
    objectFitImages();
    this.dataService.getData().pipe<Subcategories[]>(
      flatMap(data => data),
      map(subcategories => subcategories.subcategories),
      flatMap(data => data), toArray()).subscribe(incAllSubcat => {
        this.subcat = incAllSubcat;
      });

    this.compService.setStateShowItem.subscribe(incomingstate => {
      if (incomingstate !== null) {
        this.showitems = incomingstate;
      }
    });

    this.compService.selectedSubCat.subscribe(incomingsub => {
      if (incomingsub.category !== null) {
        this.subcat = incomingsub.subcategories;
      }
    });

    this.compService.selectedSortingValue.subscribe(incSortingValue => {
      this.sortingValue = incSortingValue;
    });

    this.compService.selectedFilteredStockValue.subscribe(incFilteringValue => {
      this.filteringValue = incFilteringValue;
    });
  }

  getProductName(subcategories: Subcategories) {
    this.compService.setShowItems(true);
    this.compService.setProductName(subcategories);
    this.compService.setSortingValue(this.sortingValue);
    this.compService.setFilterStockValue(this.filteringValue);
  }

}
