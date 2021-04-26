import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = []
  private cart = new BehaviorSubject<Product[]>([])

  carts = this.cart.asObservable()

  constructor() { }

  addCart(product: Product) {
    this.products = [...this.products, product]
    this.cart.next(this.products)
  }

  extractCart(product: Product) {
    const index = this.products.findIndex((prod) => product.id === prod.id)
    this.products.splice(index, 1)
    this.products = [... this.products]
    this.cart.next(this.products)
  }

  deleteCart(product: Product) {
    let founded: Object = this.products.find(prod => prod.id === product.id)

    while (founded) {
      let index = this.products.findIndex((prod) => product.id === prod.id)
      this.products.splice(index, 1)
      this.products = [... this.products]
      this.cart.next(this.products)

      founded = this.products.find(prod => prod.id === product.id)
    }

    this.cart.next(this.products)

  }


}
