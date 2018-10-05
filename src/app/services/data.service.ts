import { Injectable } from '@angular/core';
import { Data } from 'src/app/models/data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
data: Data[];
getUrl: string = 'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.getUrl);
  }
}
