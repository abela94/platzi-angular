import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(objects: Object[], key: string): any {
    const countedObjects: Object[] = []

    for (const object of objects) {
      const count: number = objects.filter(
        obj => obj[key] === object[key]
      ).length;
    
      let founded: Object = countedObjects
                            .find(obj => obj[key] === object[key])

      if (!founded) {
        countedObjects.push({... object, count})
      }
      
    }
    
    return countedObjects

  }

} 