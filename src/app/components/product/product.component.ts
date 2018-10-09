import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/models/data';
import { DataService } from '../../services/data.service';
import { Items } from '../../models/items';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  data: Data[];
  item: Items = {
    name: 'Bib',
    description: 'Baby Bib helps with keeps baby cloth clean during meal time',
    price: 12,
    imagelink: 'string',
    rating: 4,
    stock: 12,
    category: 'string',
    subcategory: 'string'
  };

  constructor(private dataService: DataService, private route: ActivatedRoute, private location: Location) {
    console.log(this.route.snapshot.params['name']);
   }

  ngOnInit() {
  this.dataService.getData().subscribe(incomingdata => {
  this.data = incomingdata;
  console.log(this.data);
});
  }

  onBack () {
    this.location.back();
  }

}
