import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit, OnChanges {
  @Input() rating: number;
  ratingArray: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges () {
    for (let i = 0; i < this.rating; i++) {
      this.ratingArray.push(i);
    }
  }

}
