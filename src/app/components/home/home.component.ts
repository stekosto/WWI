import { Component } from '@angular/core';
import { CompService } from 'src/app/services/comp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private compService: CompService) {}

  onCarouselStart(event) {
    // send the event payload to carousel.component
    this.compService.setCarouselCycle(event);
  }

}

