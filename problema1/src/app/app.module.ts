import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Importa el módulo HTTP
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartFooterComponent } from './cart-footer/cart-footer.component';
import { CartHeaderComponent } from './cart-header/cart-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartFooterComponent,
    CartHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
