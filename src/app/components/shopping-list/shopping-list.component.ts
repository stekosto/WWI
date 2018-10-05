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
  items: any;
  showitems: boolean = false;
  constructor(private compService: CompService) { }

  ngOnInit() {
    this.compService.selectedSubCat.subscribe(incomingdata => {
      if (incomingdata.category !== null) {
          this.subcategories = incomingdata.subcategories;
      }
    });

    this.compService.selectProductName.subscribe(incomingsubcat => {
     if (incomingsubcat.items !== null)  {
    this.items = incomingsubcat.items;
    }
    });
  }
  getProductName(subcategory) {
      this.showitems = true;
    }

}
