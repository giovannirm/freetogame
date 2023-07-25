import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageSuffix'
})
export class ImageSuffixPipe implements PipeTransform {

  transform(url: string): string {
    return url.replace(/(\.\w+)$/i, '-small$1');
  }

}