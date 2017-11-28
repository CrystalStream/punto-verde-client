import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';


@Pipe({
  name: 'cloudinaryUrl'
})
export class CloudinaryPipe implements PipeTransform {

  transform(value: string, transformation: string) {
    if (!value) { return value; }

    const clodinaryBaseUrl = `http://res.cloudinary.com/${environment.cloudName}/image/upload/`;
    if (transformation) {
      return `${clodinaryBaseUrl}t_${transformation}/${value}`;
    }

    return `${clodinaryBaseUrl}${value}`;
  }

}
