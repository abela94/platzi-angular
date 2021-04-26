import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Product } from 'src/app/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]>

  constructor(
    private cartService: CartService
  ) {
    this.products$ = this.cartService.carts
  }

  ngOnInit() {
    console.log(this.products$)
  }

  addCart(product: Product) {
    console.log('añadir al carrito');
    this.cartService.addCart(product)
  }

  extractCart(product: Product){
    this.cartService.extractCart(product)
  }

  deleteCart(product: Product) {
    this.cartService.deleteCart(product)
  }

}
