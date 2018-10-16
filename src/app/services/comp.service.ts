import { Injectable } from '@angular/core';
import { Data } from '../models/data';
import { BehaviorSubject, Subject } from 'rxjs';
import { Subcategories } from '../models/subcategories';
import { OfInTotal } from '../models/of-in-total';
import { Items } from '../models/items';

@Injectable({
  providedIn: 'root'
})
export class CompService {
  data: Data[];

  private subCatSource = new BehaviorSubject<Data>({ category: null, subcategories: null });
  selectedSubCat = this.subCatSource.asObservable();

  private ProductNameSource = new BehaviorSubject<Subcategories>({ name: null, items: null });
  selectProductName = this.ProductNameSource.asObservable();

  private ProductSource = new BehaviorSubject<Items>(
    { name: null,
      description: null,
      price: null,
      imagelink: null,
      rating: null,
      stock: null,
      category: null,
      subcategory: null }
  );
  selectProduct = this.ProductSource.asObservable();

  private stateShowItem = new BehaviorSubject<boolean>(undefined);
  setStateShowItem = this.stateShowItem.asObservable();

  private sortingValue = new Subject<string>();
  selectedSortingValue = this.sortingValue.asObservable();

  private returnSortingValue = new Subject<string>();
  selectedReturnSortingValue = this.returnSortingValue.asObservable();

  private filterStockValue = new BehaviorSubject<boolean>(false);
  selectedFilteredStockValue = this.filterStockValue.asObservable();

  private itemOfItemInValue = new BehaviorSubject<OfInTotal>({ current: null, total: null });
  selectedItemOfItemInValue = this.itemOfItemInValue.asObservable();


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

  setFilterStockValue(value: boolean) {
    this.filterStockValue.next(value);
  }

  setReturnSortingValue(value: string) {
    this.returnSortingValue.next(value);
  }

  setItemOfItemIn(value: OfInTotal) {
    this.itemOfItemInValue.next(value);
  }

  setProduct(value: Items) {
    this.ProductSource.next(value);
  }
}
