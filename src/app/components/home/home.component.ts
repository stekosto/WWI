import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Data } from '../../models/data';
import { Items } from '../../models/items';
import { Subcategories } from '../../models/subcategories';
import { take, skip, filter, map, flatMap, tap, mergeAll, toArray} from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // data: any;
  data: Data[];
  subcategories: Subcategories[];
  subcategory: Subcategories;
  items: Items[];
  item: Items;
  dataArray: Object[];
  activeClass: boolean = false;
  dataString: string;
  chooseProduct: number;
  dataJson: Object;
  object: Object;
  carouselInterval: number;
  carouselDataRide: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().pipe<Items[]> (
      // tap<Data> (data => console.log(data)),
    flatMap(data => data),
    // tap (data => console.log(data)),
    map(subcategories => subcategories.subcategories),
    // tap (subcategories => console.log(subcategories)),
    flatMap(data => data),
    // tap (items => console.log(items)),
    map(subcategories => subcategories.items),
    // tap (products => console.log(products)),
    flatMap(data => data), take(5),
    // tap (item => console.log(item)),
    // map(items => items)
    toArray()).subscribe(incomingdata => {
      this.items = incomingdata;
      console.log(this.items);
      // this.dataArray = Object.keys(incomingdata);
      // this.dataString = JSON.stringify(incomingdata);
      // this.dataJson = JSON.parse(this.dataString);
      // console.log(incomingdata);
      // console.log(this.items);
      // console.log(this.dataArray);
      // console.log(this.dataString);
      // console.log(this.dataJson);
    });

  }

onCarouselStart() {
    this.carouselInterval = 3000;
    this.carouselDataRide = false;
    console.log(this.carouselDataRide);
  }
}

