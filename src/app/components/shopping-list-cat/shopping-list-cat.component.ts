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
    this.compService.setStateShowItem.subscribe(incomingstate => {
      if (incomingstate !== null) {
        this.showitems = incomingstate;
        console.log('show/hide (false/true) shopping-list-cat component: ' + incomingstate);
      }
    });

    console.log('showitems ngOnInit shopping-list-cat: ' + this.showitems);

    this.dataService.getData().pipe<Subcategories[]>(
      flatMap(data => data),
      map(subcategories => subcategories.subcategories),
      flatMap(data => data), toArray()).subscribe(incAllSubcat => {
        this.allSubcat = incAllSubcat;
        // console.log(this.allSubcat);
      });

    this.compService.selectedSubCat.subscribe(incomingsub => {
      if (incomingsub.category !== null) {
          this.subcat = incomingsub.subcategories;
          // console.log('tgertete' + JSON.stringify(this.subcat));
      }
    });

    this.compService.selectedSortingValue.subscribe(incSortingValue => {
      this.sortingValue = incSortingValue;
      // console.log('inSortingValue ngOnInit shopping-list-cat: ' + incSortingValue);
    });

    this.compService.selectedFilteredStockValue.subscribe(incFilteringValue => {
      this.filteringValue = incFilteringValue;
    });

// if (this.subcat === null) {
//   this.subcategories = this.allSubcat;
//   console.log(this.subcat);
// } else {
//   this.subcategories = this.subcat;
//   // console.log(this.subcategories);
// }
}



  getProductName(subcategories: Subcategories) {
    console.log('showitems shopping-list-cat: ' + this.showitems);
    console.log(subcategories);
    this.compService.setShowItems(true);
    this.compService.setProductName(subcategories);
    console.log('BEFORE SET Sorting value / shopping-list-cat.comp :' + this.sortingValue);
    this.compService.setSortingValue(this.sortingValue);
    console.log('AFTER SET Sorting value / shopping-list-cat.comp :' + this.sortingValue);
    console.log('BEFORE SET filterring value / shopping-list-cat.comp :' + this.filteringValue);
    this.compService.setFilterStockValue(this.filteringValue);
    console.log('AFTER SET filterring value / shopping-list-cat.comp :' + this.filteringValue);

  }

}
