import { Component, OnInit } from '@angular/core';
import { CompService } from '../../services/comp.service';
import { DataService } from '../../services/data.service';
import { Subcategories } from '../../models/subcategories';

@Component({
  selector: 'app-shopping-list-cat',
  templateUrl: './shopping-list-cat.component.html',
  styleUrls: ['./shopping-list-cat.component.scss']
})
export class ShoppingListCatComponent implements OnInit {
  showitems = false;
  subcategories: Subcategories[];
  constructor(private dataService: DataService, private compService: CompService) { }

  ngOnInit() {
    this.compService.selectedSubCat.subscribe(incomingdata => {
      if (incomingdata.category !== null) {
          this.subcategories = incomingdata.subcategories;
      }
    });
    this.compService.setStateShowItem.subscribe(incomingstate => {
      if (incomingstate !== null) {
        this.showitems = incomingstate;
        // console.log(incomingstate);
      }
    });
  }

  getProductName(subcategories: Subcategories) {
    this.compService.setProductName(subcategories);
    this.compService.setShowItems(true);
    // console.log(subcategories);
    // console.log(this.showitems);
  }

}
