import { Injectable } from '@angular/core';
import { Data } from '../models/data';
import { BehaviorSubject } from 'rxjs';
import { Subcategories } from '../models/subcategories';

@Injectable({
  providedIn: 'root'
})
export class CompService {
  data: Data[];

  private subCatSource = new BehaviorSubject<Data>({ category: null, subcategories: null });
  selectedSubCat = this.subCatSource.asObservable();
  private ProductNameSource = new BehaviorSubject<Subcategories>({ name: null, items: null });
  selectProductName = this.ProductNameSource.asObservable();
  private stateShowItem = new BehaviorSubject<boolean>(false);
  setStateShowItem = this.stateShowItem.asObservable();
  private sortingValue = new BehaviorSubject<string>('0');
  selectedSortingValue = this.sortingValue.asObservable();

  constructor() { }

  setSubCat(data: Data) {
    this.subCatSource.next(data);
  }

  setProductName(subItem: Subcategories) {
    this.ProductNameSource.next(subItem);
  }

  setShowItems(state: boolean) {
    this.stateShowItem.next(state);
  }

  setSortingValue(value: string) {
    this.sortingValue.next(value);
  }

}
