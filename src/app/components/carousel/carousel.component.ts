import { Component, OnInit, ViewChild, DoCheck, EventEmitter, Output, Input } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { Items } from 'src/app/models/items';
import { take, skip, filter, map, flatMap, tap, mergeAll, toArray, concatMap } from 'rxjs/operators';
import { directiveCreate } from '@angular/core/src/render3/instructions';
import { TouchSequence } from 'selenium-webdriver';
import { CompService } from 'src/app/services/comp.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, DoCheck {
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  data: Array<Items> = [];
  items: Items[];
  // carouselItemElemList: any ;
  // carouselItemElemActive: Element ;
  @ViewChild('carousel') carousel: NgbCarousel;
  // @Input() carouselInterval: number;
  // @Input() carouselCycle: any;

  constructor(config: NgbCarouselConfig, private dataService: DataService, private compService: CompService) {
    config.interval = 0;
    config.wrap = true;
    config.keyboard = false;
    // config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.dataService.getData().pipe(
      flatMap(data => data.map(data2 => data2.subcategories))
      , flatMap(data => data.map(data3 => data3.items))
      , mergeAll()
      , toArray()
    ).subscribe(incData => {
      this.items = incData.sort(() => .5 - Math.random()).slice(10, 15);
      // console.log(this.items);
    });
    // this.carouselItemElemList = Array.from(document.querySelectorAll('.carousel-item2'));
    // this.carouselItemElemActive = document.querySelector('.active2');
    this.compService.selectCarouselCycleMethod.subscribe(incValue => {
      if (incValue !== null) {
        this.onCycle();
      }
    });
  }


  ngDoCheck() {
  }


  onCycle() {
    // this.cleanPrevMess();
    this.carousel.interval = 3000;
    this.carousel.cycle();
    console.log('faskldfjklasdj');
  }

  prev() {
    //   this.carousel.interval = 0;
    //   this.carousel.prev();

    //   const carouselItemElemActive = document.querySelector('.active');
    //   carouselItemElemActive.classList.add('active2');
    //   carouselItemElemActive.classList.add('active2');

    //   const carouselItemElemListActive = Array.from(document.querySelectorAll('.active'));
    //   if (carouselItemElemListActive !== null) {
    //     carouselItemElemListActive.forEach(element => {
    //     element.classList.remove('active');
    //   });
    // }
    //   const carouselItemElemList = Array.from(document.querySelectorAll('.carousel-item'));
    //   carouselItemElemList.forEach(element => {
    //   element.classList.remove('carousel-item');
    //   element.classList.add('carousel-item2');
    //   element.classList.remove('active');
    //   });

    //   const carouselItem2ElemList = Array.from(document.querySelectorAll('.carousel-item2'));
    //   carouselItem2ElemList.forEach(element => {
    //   element.classList.remove('active');
    //   });


    //   console.log('dsfasdfsda0');
  }

  // next() {
  //   this.cleanPrevMess();
  //   this.carousel.interval = 0;
  //   this.carousel.next();
  // }

  //   cleanPrevMess () {
  //     const carouselItemElemList = Array.from(document.querySelectorAll('.carousel-item2'));
  //     if (carouselItemElemList !== null) {
  //       carouselItemElemList.forEach(element => {
  //     element.classList.remove('carousel-item2');
  //     element.classList.add('carousel-item');
  //     });
  //     }

  //     const carouselItemElemListActive = Array.from(document.querySelectorAll('.active2'));
  //     if (carouselItemElemListActive !== null) {
  //       carouselItemElemListActive.forEach(element => {
  //       element.classList.remove('active2');
  //     });
  //   }

  // }
}
