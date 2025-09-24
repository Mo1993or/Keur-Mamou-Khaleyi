import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/core/components/home/home.component';
import { LoginComponent } from './app/core/components/login/login.component';
import { RegisterComponent } from './app/core/components/register/register.component';
import { CartComponent } from './app/core/components/cart/cart.component';
import { Page404Component } from './app/core/components/page404/page404.component';
import { SearchresultComponent } from './app/core/components/searchresult/searchresult.component';
import { CheckoutComponent } from './app/modules/product/components/checkout/checkout.component';
const appRoutes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent,
    // canActivate:[canActivate]

  },
  {
    path:'register',
    component:RegisterComponent,
    // canActivate:[canActivate]

  },
  {
    path:'products',
    component:SearchresultComponent
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
  },
  {
    path:'**',
    component:Page404Component,
    data:{message:'Oops... This is a Bad request'}
  },
];
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(appRoutes)] // Fournissez HttpClient
})
  .catch(err => console.error(err));
