import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/models/data';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  data: Data[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
  this.dataService.getData().subscribe(incomingdata => {
  this.data = incomingdata;
  console.log(this.data);
});
  }

}
