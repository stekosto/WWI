import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Data } from '../../models/data';
import { Items } from '../../models/items';
import { Subcategories } from '../../models/subcategories';
import { take, skip, filter, map, flatMap, tap, mergeAll, toArray } from 'rxjs/operators';
import { CompService } from 'src/app/services/comp.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
  data: Data[];
  subcategories: Subcategories[];
  subcategory: Subcategories;
  items: Items[];
  item: Items;
  dataArray: Object[];
  dataString: string;
  chooseProduct: number;
  dataJson: Object;
  object: Object;
  // carouselInterval: any = false;
  // carouselRide: string = 'false';
  // carouselWrap: boolean = false;
  // activeClass: boolean = false;

  constructor(private compService: CompService) {}

  ngOnInit() {
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
  }

  onCarouselStart(event) {
    this.compService.setCarouselCycle(event);
    // $('.carousel').carousel('cycle');
    // this.carouselInterval = 3000;
    // this.carouselRide = 'carousel';
  }

//   onCarouselNext() {
//     $('.carousel').carousel('pause');
//   }

//   onCarouselPrev() {
//      $('.carousel').carousel('pause');
//   }
}

