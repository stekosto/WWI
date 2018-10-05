import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Data } from '../../models/data';
import { Items } from '../../models/items';
import { Subcategories } from '../../models/subcategories';
import { take, skip, filter, map, flatMap } from 'rxjs/operators';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  // data: any;
  data: Data[] = [];
  subcategories: Subcategories[];
  items: Items[];
  item: string;
  dataArray: Array<Object>;
  activeClass: boolean = false;
  dataString: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(incomingdata => {
      // this.items = incomingdata[0].subcategories[0].items;
      this.data = incomingdata;
      // this.dataArray = Object.keys(incomingdata);
      // this.dataString = JSON.stringify(incomingdata);
       console.log(incomingdata);
      // console.log(this.items);
      // console.log(this.dataArray);
      // console.log(this.dataString);
    });
  }

  ngDoCheck() {
    const array = this.data;
    if (array != null) {
      for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
        // console.log(i);
        for (let j = 0; j < array[i].subcategories.length; j++) {
          console.log(array[i].subcategories);
          for (let k = 0; k < array[i].subcategories[j].items.length; k++) {
            // console.log(array[i].subcategories[j].items);
            //   array[i].subcategories[j].items.forEach(function (value) {
            //    if (value.rating = 3) { console.log(value.name); }
            // });
            // console.log(array[i].subcategories[j].items);
          }
          // console.log(array[i].subcategories);
        }
    }
  }
}
}
