import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './core/components/home/home.component';
import { CarouselComponent } from './core/components/home/carousel/carousel.component';
import { CartComponent } from './core/components/cart/cart.component';
import { CartitemComponent } from './core/components/cart/cartitem/cartitem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthinterceptorService } from './shared/services/auth/authinterceptor.service';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { SharedModule } from './shared/shared.module';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppComponent, // <--- Importer AppComponent
    HomeComponent,
    CarouselComponent,
    CartComponent,
    CartitemComponent,
   // SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorService, multi: true }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: []
})
export class AppModule {}
