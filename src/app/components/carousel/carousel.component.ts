import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { Items } from 'src/app/models/items';
import { flatMap, mergeAll, toArray } from 'rxjs/operators';
import { CompService } from 'src/app/services/comp.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  items: Items[];
  // assign template reference variable to ng carousel directive
  @ViewChild('carousel') carousel: NgbCarousel;

  constructor(config: NgbCarouselConfig, private dataService: DataService, private compService: CompService) {
    // initialize ng carousel
    config.interval = 0;
    config.wrap = true;
    config.keyboard = false;
    config.showNavigationIndicators = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    // get products from server
    this.dataService.getData().pipe(
      flatMap(data => data.map(data2 => data2.subcategories))
      , flatMap(data => data.map(data3 => data3.items))
      , mergeAll()
      , toArray()
    ).subscribe(incData => {

      // pick 6 random products
      this.items = incData.sort(() => .5 - Math.random()).slice(10, 15);
    });

    // get click event from  'Toggle Slide Show' button in home.component call onCycle()
    this.compService.selectCarouselCycleMethod.subscribe(incValue => {
      if (incValue !== null) {
        this.onCycle();
      }
    });
  }

  onCycle() {
    // set interval and start carousel from left to right
    this.carousel.interval = 3000;
    this.carousel.cycle();
  }

}
