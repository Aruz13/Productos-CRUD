import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css']
})
export class CartHeaderComponent implements OnInit {
  cart: any[] = [];
  products: any[] = [];
  showCart: boolean = false;
  showAddProductModal: boolean = false;
  showManageProducts: boolean = false;
  newProduct: any = {
    title: '',
    description: '',
    price: null
  };

  constructor(private cartService: CartService, private productsService: ProductService) {}

  ngOnInit(): void {
    // Nos suscribimos a los cambios del carrito para actualizaciones en tiempo real
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });
    this.loadProducts();
  }

  // Contar productos en el carrito
  getCartCount(): number {
    return this.cart.length;
  }

  toggleManageProducts() {
    this.showManageProducts = !this.showManageProducts;
    this.loadProducts();
  }

  // Mostrar/Ocultar la ventana del carrito
  toggleCart() {
    this.showCart = !this.showCart;
  }

  // Eliminar producto del carrito
  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }


  // Función para añadir un nuevo producto
  addNewProduct() {
    if (this.newProduct.title && this.newProduct.description && this.newProduct.price) {
      this.productsService.postProducts(this.newProduct).subscribe(() => {
        console.log(this.newProduct)
        // Aquí puedes manejar lo que ocurre después de añadir el producto
        this.resetForm();
        window.location.reload();
      }, error => {
        console.error('Error adding product:', error);
      });
    }
  }

  // Función para resetear el formulario
  resetForm() {
    this.newProduct = {
      title: '',
      description: '',
      price: null
    };
    this.toggleAddProductModal(); // Cierra el modal
  }

  toggleAddProductModal() {
    this.showAddProductModal = !this.showAddProductModal;
  }

  deleteProduct(productId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productsService.deleteProduct(productId).subscribe(() => {
        this.loadProducts(); // Volver a cargar la lista después de la eliminación
        window.location.reload();
      });
    }
  }

  editProduct(product: any) {
    
  }

  loadProducts() {
    this.productsService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }
}
