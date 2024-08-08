import { Component, inject, OnInit } from '@angular/core';
import { IProduit } from '../shared/ientities';
import { ProduitService } from '../shared/produit.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  produits: IProduit[] = [];
  mesProduits: IProduit[] = [];
  service = inject(ProduitService);
  cartService = inject(CartService);
  quantiteTemp: { [id: number]: number } = {};

  ngOnInit(): void {
    this.getAllProduits();
  }

  getAllProduits() {
    this.produits = this.service.fetchAll();
  }

  addOneQuantity(produitId: number) {
    if (!this.quantiteTemp[produitId]) {
      this.quantiteTemp[produitId] = 1;
    } else {
      this.quantiteTemp[produitId] += 1;
    }
  }

  removeOneQuantity(produitId: number) {
    if (this.quantiteTemp[produitId] > 0) {
      this.quantiteTemp[produitId] -= 1;
    }
  }

  addQuantitiesToCart(produit: IProduit) {
    const quantiteAjouter = this.quantiteTemp[produit.id] || 0;

    if (quantiteAjouter > 0) {
      this.cartService.addToCart(produit, quantiteAjouter);
    }

    this.quantiteTemp[produit.id] = 0;

    this.mesProduits = this.cartService.fetchAll();
  }
}
