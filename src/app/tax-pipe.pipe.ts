import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taxPipe'
})
export class TaxPipePipe implements PipeTransform {

  transform(num:number, tax?: number): any {
    let taxRate:number = 7;
    if(typeof tax == "number"){
      taxRate = tax;
    }
    return num * taxRate / 100 
  }

}
