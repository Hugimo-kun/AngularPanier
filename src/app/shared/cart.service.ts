import { Injectable } from '@angular/core';
// import { mockCart } from './mockCart';
import { IProduit } from './ientities';
import { mockCart } from './mockCart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  fetchAll() {
    return mockCart;
  }

  addToCart(produit: IProduit, quantiteAjoute: number) {
    const produitExiste = mockCart.find((item) => item.id === produit.id);

    if (produitExiste) {
      produitExiste.quantite += quantiteAjoute;
    } else {
      mockCart.push({ ...produit, quantite: quantiteAjoute });
    }
  }

  removeFromCart(produit: IProduit) {
    const index = mockCart.findIndex((item) => item.id === produit.id);

    if (index !== -1) {
      mockCart.splice(index, 1);
    }
  }
}
