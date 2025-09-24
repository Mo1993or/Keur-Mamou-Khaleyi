import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/core/components/home/home.component';
import { CartComponent } from './app/core/components/cart/cart.component';
import { CheckoutComponent } from './app/modules/product/components/checkout/checkout.component';
const appRoutes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'categories',
    loadChildren:()=>import('./app/modules/product/product.module').then(m=>m.ProductModule)
  },
  {
    path:'shopping-cart',
    component:CartComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    //canActivate:[canActivate],
  }
];
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(appRoutes)] // Fournissez HttpClient
})
  .catch(err => console.error(err));
