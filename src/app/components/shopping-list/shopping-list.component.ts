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
  constructor(private compService: CompService) { }

  ngOnInit() {
    this.compService.selectedSubCat.subscribe(incomingdata => {
      if (incomingdata.category !== null) {
          this.subcategories = incomingdata.subcategories;
          // console.log(this.subcategories);
      }
    });

    this.compService.selectProductName.subscribe(incomingsubcat => {
     if (incomingsubcat.items !== null)  {
    this.items = incomingsubcat.items;
    console.log(this.items);
    }
    });

    this.compService.setStateShowItem.subscribe(incomingstate => {
      if (incomingstate !== null) {
        this.showitems = incomingstate;
        // console.log(incomingstate);
      }
    });

    this.compService.selectedSortingValue.subscribe(value => {
      if (value !== null) {
        this.sortingValue = value;
        this.sort(value);
        console.log(value);
      }
    });
  }

 sort(value)  {
  switch (value) {
    case '1':
    console.log('NO FILTER');
    break;
    case '2':
    console.log('Sorted by Price');
    break;
    case '3':
    console.log('Sorted by AB');
    break;
    case '4':
    console.log('Sorted by Rating');
    break;
  }
//    console.log('123');
//   this.items.sort( function(name1, name2) {
//     if ( item.name < item.name ) {
//       return -1;
//     } else if ( item.fname > item.name ) {
//         return 1;
//     } else {
//       return 0;
//     }
// });
 }

}
