import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterField',
})
export class FilterFieldPipe implements PipeTransform {
  /**
   Accepts
   1 Array,
   2 Search string
   3 Fields of this object with which the search string will be compared.

   Returns the filtered array

   FIELDS are given as an array of strings.
   If the string has a period, it will be unwound as a property.

   Field example
   'name',
   or
   ['name']
   or
   ['name', 'phone']
   or
   ['name', 'phone', 'club.confirmed']

   Created by kastommor
   */
  transform(array: any[], searchStr: string = '',  fields: any){

    let filteredArray = [];

    if (typeof(fields) === 'string'){
      fields = [fields];
    }


    if (array.length === 0 || searchStr === '' || fields.length === 0){
      filteredArray = array;
    } else {
      for (let f in  array){
        let item = array[f];
        for (let i in fields) {
          if(item[fields[i]] != undefined) {
            if (item[fields[i]].toLowerCase().toString().indexOf(searchStr.toLowerCase()) > -1){
              filteredArray.push(item);
              break;
            }
          } else if (fields[i].indexOf('.') > -1){
            let itemFromAdress = index(item, fields[i]).toString();
            if (itemFromAdress.toLowerCase().indexOf(searchStr.toLowerCase()) > -1){
              filteredArray.push(item);
              break;
            }
          } else {
            console.log('The source array does not have the specified fields. ' +
              'Check if the fields are entered correctly.');
          }
        }
      }

      if (filteredArray.length === 0) {
        console.log('no have matches');
      }


    }

    /** A recursive function "Index" that accepts an object, and the address to the field of this object as a string.
     * The "Index" function will return field values if such a field exists, or false if not. **/


    function index(obj: any, is: any) {
      if (typeof is == 'string') {
        return index(obj, is.split('.'));
      }
      else if (is.length==0) {
        return obj;
      }
      else {
        if(obj[is[0]] != undefined){
          return index(obj[is[0]],is.slice(1));
        } else {
          return '';
        }
      }
    }

    return filteredArray;

  }
}
