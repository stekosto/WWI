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

  private subCatSource = new BehaviorSubject<Data>({ category: null, subcategories: [] });
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

  private stateShowItem = new BehaviorSubject<boolean>(false);
  setStateShowItem = this.stateShowItem.asObservable();

  private sortingValue = new BehaviorSubject<string>('1');
  selectedSortingValue = this.sortingValue.asObservable();

  private returnSortingValue = new Subject<string>();
  selectedReturnSortingValue = this.returnSortingValue.asObservable();

  private filterStockValue = new BehaviorSubject<boolean>(false);
  selectedFilteredStockValue = this.filterStockValue.asObservable();

  private itemOfItemInValue = new BehaviorSubject<OfInTotal>({ current: null, total: null });
  selectedItemOfItemInValue = this.itemOfItemInValue.asObservable();

  private carouselCycleMethod = new Subject<Object>();
  selectCarouselCycleMethod = this.carouselCycleMethod.asObservable();

  constructor() { }

  setSubCat(data: Data) {
    this.subCatSource.next(data);
    console.log('---------------compService: setSubCat------------');
    console.log(data);
  }

  setProductName(subItem: Subcategories) {
    console.log('-------- compService: setProductName----------');
    console.log(subItem);
    this.ProductNameSource.next(subItem);
  }

  setShowItems(state: boolean) {
    console.log('compService: showItems:' + state);
    this.stateShowItem.next(state);
  }

  setSortingValue(value: string) {
    console.log('compService: sortingValue:' + value);
    this.sortingValue.next(value);
  }

  setFilterStockValue(value: boolean) {
    console.log('compService: FilteringValue:' + value);
    this.filterStockValue.next(value);
  }

  setReturnSortingValue(value: string) {
    this.returnSortingValue.next(value);
    console.log('compService: returnSortingValue:' + value);

  }

  setItemOfItemIn(value: OfInTotal) {
    this.itemOfItemInValue.next(value);
  }

  setProduct(value: Items) {
    this.ProductSource.next(value);
  }

  setCarouselCycle(value: Object) {
    this.carouselCycleMethod.next(value);
  }
}
