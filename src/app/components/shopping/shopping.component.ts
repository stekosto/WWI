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
  isTrue: boolean = false;
  showitems: boolean = false;

  constructor(private dataService: DataService, private compService: CompService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(incomingdata => {
      this.data = incomingdata;
    });
  }

  getSubcat(data: Data) {
    this.compService.setSubCat(data);
    this.showitems = true;
  }

  getProductName(subcategories: Subcategories) {
    this.compService.setProductName(subcategories);
    this.showitems = true;
  }

}
