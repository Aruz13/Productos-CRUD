import { Component, OnInit } from '@angular/core';

interface Product {
  title: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.css']
})
export class CartFooterComponent implements OnInit {
  cart: Product[] = [];
  showCart: boolean = false;  // Controla la visibilidad de la ventana flotante

  constructor() { }

  ngOnInit(): void {
    // Cargar el carrito desde el localStorage al iniciar el componente
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  // Alternar visibilidad de la ventana flotante del carrito
  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  // Eliminar producto del carrito
  removeFromCart(product: Product): void {
    this.cart = this.cart.filter(p => p !== product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // Obtener el número total de productos en el carrito
  getCartCount(): number {
    return this.cart.length;
  }
}