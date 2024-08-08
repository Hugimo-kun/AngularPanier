import { Component, inject, OnInit } from '@angular/core';
import { IProduit } from '../shared/ientities';
import { ProduitService } from '../shared/produit.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../shared/cart.service';
import { MontantTTCPipe } from '../shared/montant-ttc.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MontantTTCPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  mesProduits: IProduit[] = [];
  service = inject(CartService);
  quantiteTotal: number = 0;

  ngOnInit(): void {
    this.getMyProducts();
  }

  getMyProducts() {
    this.mesProduits = this.service.fetchAll();
  }

  removeProduct(produit: IProduit) {
    this.service.removeFromCart(produit);
    this.getMyProducts();
  }

  getTotalQuantity(): number {
    this.quantiteTotal = 0;

    for (let produit of this.mesProduits) {
      this.quantiteTotal += produit.quantite;
    }

    return this.quantiteTotal;
  }

  getOnePriceHT(produit: IProduit) {
    let prixTotalHT: number = 0;
    return (prixTotalHT = produit.quantite * produit.prixHT);
  }

  getTotalPriceHT() {
    let prixTotalHT: number = 0;
    for (let produit of this.mesProduits) {
      prixTotalHT += produit.quantite * produit.prixHT;
    }
    return prixTotalHT;
  }
}
