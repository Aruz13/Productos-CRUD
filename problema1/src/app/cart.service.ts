import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>(this.getCartFromLocalStorage());
  cart$ = this.cart.asObservable(); // Exponemos el observable para que otros componentes se suscriban

  constructor() {}

  // Añadir producto al carrito
  addToCart(product: any) {
    const currentCart = this.cart.value;
    const updatedCart = [...currentCart, product];
    this.cart.next(updatedCart); // Emitir el nuevo valor del carrito
    this.saveCartToLocalStorage(updatedCart);
  }

  // Eliminar producto del carrito
  removeFromCart(product: any) {
    const currentCart = [...this.cart.value]; // Copiamos el carrito actual para evitar modificarlo directamente
    //const index = currentCart.findIndex(item => item.id === product.id);
    let i = 0
    //console.log(product)
    for (let cart of currentCart) {
      // Aquí puedes acceder a cada elemento 'cart' del array 'currentCart'
      //console.log(cart)
      if(cart["title"] == product["title"]){
        currentCart.splice(i, 1);
        //console.log("Entra",i, "////", cart["title"], "  -   ", product["title"])
        break
      }
      i=i+1
    }
    /*
    if (index !== -1) {
      currentCart.splice(index, 1); // Eliminamos solo la primera coincidencia
    }*/
  
    this.cart.next(currentCart); // Emitimos el carrito actualizado
    this.saveCartToLocalStorage(currentCart); // Guardamos el carrito actualizado en localStorage
  }

  // Obtener carrito desde localStorage
  private getCartFromLocalStorage(): any[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // Guardar carrito en localStorage
  private saveCartToLocalStorage(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}