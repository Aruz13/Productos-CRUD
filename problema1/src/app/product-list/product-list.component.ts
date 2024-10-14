import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

interface Product {
  title: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];     // Todos los productos
  filteredProducts: Product[] = [];  // Productos filtrados por búsqueda
  searchTerm: string = '';      // Término de búsqueda
  cart: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    // Obtener los productos desde la API cuando el componente cargue
    this.productService.getProducts().subscribe((data) => {
      console.log("Hola 456")
      console.log(data)
      // Mapeamos los productos para ajustarlos a nuestra estructura
      this.products = data.map((item: any) => ({
        title: item.title,
        description: item.description,
        price: item.price
      }));
      this.filteredProducts = this.products;  // Iniciamente, todos los productos están dilsponibles
    });

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  addToCart2(product: Product): void {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    alert(`${product.title} ha sido añadido al carrito!`);
  }

  // Añadir producto al carrito
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  // Método para filtrar los productos en función del término de búsqueda
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}