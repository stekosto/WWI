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
  carouselInterval: any = false;
  carouselRide: string = 'false';
  carouselWrap: boolean = false;

  constructor(private dataService: DataService, private compService: CompService) { }

  ngOnInit() {
    this.dataService.getData().pipe<Items[]>(
      flatMap(data => data),
      map(subcategories => subcategories.subcategories),
      flatMap(data => data),
      map(subcategories => subcategories.items),
      flatMap(data => data), take(5),
      toArray()).subscribe(incomingdata => {
        this.items = incomingdata;
        // console.log(this.items);
        // this.dataArray = Object.keys(incomingdata);
        // this.dataString = JSON.stringify(incomingdata);
        // this.dataJson = JSON.parse(this.dataString);
      });
  }

  ngOnChanges() {

  }

  ngOnDestroy() {
    // this.compService.setShowItems(undefined);
  }

  onCarouselStart() {
    // // $('.carousel').carousel('dispose')
    // $('.carousel').carousel({
    // //  pause: true,
    // //  dispose: true,
    //  interval: 3000,
    //  cycle: true
    //  });
    // this.carouselInterval = 3000;
    // this.carouselRide = 'carousel';

    //  $('.carousel').carousel('next');
    $('.carousel').carousel('cycle');
    $('.carousel').carousel({
      interval: 3000
    });

  }

  onCarouselNext() {
    // $('.carousel').carousel('next');
    $('.carousel').carousel('pause');
    this.carouselInterval = 'false';
    this.carouselRide = 'false';

  }

  onCarouselPrev() {
    // $('.carousel').carousel('prev');
     $('.carousel').carousel('pause');
     this.carouselInterval = 'false';
     this.carouselRide = 'false';



  }
}

