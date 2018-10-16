import { Component, OnInit } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { DataService } from '../../services/data.service';
import { Subcategories } from '../../models/subcategories';
import { map, flatMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list-cat',
  templateUrl: './shopping-list-cat.component.html',
  styleUrls: ['./shopping-list-cat.component.scss']
})
export class ShoppingListCatComponent implements OnInit {
  showitems = false;
  subcategories: Subcategories[] = [];
  allSubcat: Subcategories[];
  subcat: Subcategories[];
  constructor(private dataService: DataService, private compService: CompService) { }

  ngOnInit() {
    this.dataService.getData().pipe<Subcategories[]>(
      flatMap(data => data),
      map(subcategories => subcategories.subcategories),
      flatMap(data => data), toArray()).subscribe(incAllSubcat => {
        this.allSubcat = incAllSubcat;
        console.log(this.allSubcat);
      });


    this.compService.setStateShowItem.subscribe(incomingstate => {
      if (incomingstate !== null) {
        this.showitems = incomingstate;
        // console.log(incomingstate);
      }
    });

    this.compService.selectedSubCat.subscribe(incomingsub => {
      if (incomingsub.category !== null) {
          this.subcat = incomingsub.subcategories;
          // console.log('tgertete' + JSON.stringify(this.subcat));
      }
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
    this.compService.setProductName(subcategories);
    this.compService.setShowItems(true);
    console.log(subcategories);
    console.log('sh-l-cat: ' + this.showitems);
  }

}
