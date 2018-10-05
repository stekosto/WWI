import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Data } from '../../models/data';
import { Items } from '../../models/items';
import { Subcategories } from '../../models/subcategories';
import { take, skip, filter, map, flatMap, tap, mergeAll} from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  // data: any;
  data: any;
  subcategories: Subcategories[];
  subcategory: Subcategories;
  items: Items[];
  item: Items;
  dataArray: Array<Object>;
  activeClass: boolean = false;
  dataString: string;
  chooseProduct: number;
  dataJson: Object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().pipe (
    tap (data => console.log(data)),
    flatMap(data => data),
    // tap (data => console.log(data)),
    map(subcategories => subcategories.subcategories),
    // tap (subcategories => console.log(subcategories)),
    flatMap(data => data),
    // tap (items => console.log(items)),
    map(subcategories => subcategories.items),
    // tap (products => console.log(products)),
    flatMap(data => data),
    // tap (item => console.log(item))
    map(data => this.data = data)
    ).subscribe(incomingdata => {
      this.data = incomingdata;
      console.log(this.data);
      // this.dataArray = Object.keys(incomingdata);
      // this.dataString = JSON.stringify(incomingdata);
      // this.dataJson = JSON.parse(this.dataString);
      //  console.log(incomingdata);
      // console.log(this.items);
      // console.log(this.dataArray);
      // console.log(this.dataString);
      // console.log(this.dataJson);
    });
  }

populateCarousel () {
  this.chooseProduct = 5;
  const array = this.data;
    if (array != null) {
      for (let i = 0; i < array.length; i++) {
            const resultArray: any = [];
            const keys = Object.entries(array[i]);
            for ( const [item, value] of keys) {
              if (item === 'rating' && value == this.chooseProduct) {
                resultArray.push();
            }
            console.log(resultArray);
        }
    }
  }

// }
// }
//   this.chooseProduct = 5;
//   const array = this.data;
//     if (array != null) {
//       for (let i = 0; i < array.length; i++) {
//         for (let j = 0; j < array[i].subcategories.length; j++) {
//           for (let k = 0; k < array[i].subcategories[j].items.length; k++) {
//             const resultArray: any = [];
//             const keys = Object.entries(array[i].subcategories[j].items[k]);
//             // console.log(keys);
//             for ( const [item, value] of keys) {
//               // console.log(item, value);
//               if (item === 'rating' && value == this.chooseProduct) {
//                 resultArray.push(array[i].subcategories[j].items[k].imagelink);
//               // }
//               // const resultArray: any = [{}];
//             // if (array[i].subcategories[j].items[k].rating === this.chooseProduct) {
//               // for (const key of resultArray) {
//               //   // console.log(key);
//               //   obj[key] = array[i].subcategories[j].items['rating'];
//               // }
//               // console.log(array[i]);k
//               // console.log(array[i].subcategories[j]);
//               // console.log(array[i].subcategories[j].items);
//               // console.log(array[i].subcategories[j].items[k].name);


//             }
//              {
//               console.log(resultArray);

//           }

//         }
//     }
//   }

// }
// }
console.log('den doylevei malaka');
}



  ngDoCheck() {
//   //   const array = this.data;
//   //   if (array != null) {
//   //     for (let i = 0; i < array.length; i++) {

//   //       for (let j = 0; j < array[i].subcategories.length; j++) {

//   //         for (let k = 0; k < array[i].subcategories[j].items.length; k++) {

//   //           if (array[i].subcategories[j].items[k].rating = 2) {
//   //             console.log(array[i].subcategories[j].items[k].name);
//   //           }

//   //           //   array[i].subcategories[j].items.forEach(function (value) {
//   //           //     { console.log(value.name);
//   //           //       console.log(i, j, k);
//   //           //     }
//   //           // });

//   //         }

//   //       }
//   //   }
//   // }
}
}
