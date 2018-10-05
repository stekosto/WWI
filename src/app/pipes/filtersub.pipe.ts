import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtersub'
})
export class FiltersubPipe implements PipeTransform {

  transform(data: any, filterString: string): any {
    // if (!data || !filterString) {
    //   return data;
    // }
    // return data.filter(item => item.category.indexOf(filterString.category) !== -1);

    // const resultArray: any = [];

    // for (const item of data) {
    //   if (item === filterString) {
    //     resultArray.push(item);
    //   }
    //   return resultArray;
    // }

  }

}
