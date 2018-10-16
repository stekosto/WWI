import { Injectable } from '@angular/core';
import { Data } from 'src/app/models/data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Items } from '../models/items';
import { map, switchMap } from 'rxjs/operators';
import { Subcategories } from '../models/subcategories';
import { from } from 'rxjs';
import { from as observableFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
data: Data[];
getUrl = 'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.getUrl);
  }

  // getItems(): Observable<Subcategories[]> {
  //   return this.http.get<Subcategories[]>(this.getUrl).pipe(
  //   switchMap (items => from(items))
  //   );
  // }
}
