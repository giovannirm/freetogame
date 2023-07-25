import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private filterTitle$: new BehaviorSubject<string>('');

  constructor() {
    this.filterTitle$ = new BehaviorSubject<string>('');
  }
  
  get filterTitle(): Observable<string> {
    return this.filterTitle$.asObservable();
  }

  set filterTitle(value: string) {
    this.filterTitle$.next(value);
  }
}
