import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    console.log("Hola 123")
    let url = this.apiUrl + '/GET/products'
    let data = this.http.get(url);
    console.log(data)
    return data;
  }

  postProducts(product: any): Observable<any> {
    let url = this.apiUrl + '/POST/products'

    return this.http.post<any>(url, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  // Editar un producto existente
  putProduct(productId: number, updatedProduct: any): Observable<any> {
    let url = this.apiUrl + '/PUT/products'

    return this.http.put<any>(`${url}/${productId}`, updatedProduct, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Eliminar un producto
  deleteProduct(productId: number): Observable<any> {    
    let url = this.apiUrl + '/DELETE/products'

    return this.http.delete<any>(`${url}/${productId}`);
  }

}