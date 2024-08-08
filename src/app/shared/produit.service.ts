import { Injectable } from '@angular/core';
import { mock } from './mockProduct';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  constructor() {}

  fetchAll() {
    return mock;
  }
}
