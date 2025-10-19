import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Product } from 'src/app/modules/product/model';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { CardskeletonComponent } from 'src/app/shared/widgets/skeleton/cardskeleton/cardskeleton.component';
import { CartService } from '../../services/cart.service';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CarouselComponent, CardskeletonComponent,RouterModule,CommonModule],
  styles: [
    `
    .home {
      // position: relative;
      // top: 120px;
      // left: 0;
      // width: 100%;
      
      // background-color: #fff;
      // z-index: -1;
    }
    
    `
  ]
})
export class HomeComponent implements OnInit{
  products:Product[]=[];
  productsFilter:Product[]=[];
  skeletons:number[]=[...new Array(6)];
  error!:string;
  isLoading=false;
  cart:Product[]=[];
  images:string[]= [
    // "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    // "https://www.creativefabrica.com/wp-content/uploads/2021/05/15/Quote-T-shirt-design-001-Graphics-12041380-1.jpg",
    // "https://www.apetogentleman.com/wp-content/uploads/2022/10/graphic-tees-men-1.jpg",

    "assets/images/4.png",
    "assets/images/3.png",
    "assets/images/2.png",
    "assets/images/1.png",

   ];
   
  constructor(private _productService:ProductService,private cartService:CartService){
  }
  ngOnInit(): void {
   this.newArrivalProducts();
  }
  newArrivalProducts(){
    // var productItem:Product = {"id":1,
    //   "title": "testt",
    //   "description": "rfff",
    //   "category": "ddff",
    //   "type": "nncdc",
    //   "sizes": ["12","13"],
    //   "size":"10",
    //   "images": ["assets/images/2_2.jpeg", "assets/images/3_3.jpeg"],
    //   "stock": "disponible",
    //   "price": 15000,
    //   "prevprice": 10000,
    //   "qty": 2,
    //   "discount": 10,
    //   "totalprice": 200000,
    //   "rating": {
    //     "rate": 100,
    //     "count": 100,
    //   }};
    //   var productItem2:Product = {"id":2,
    //   "title": "testt",
    //   "description": "rfff",
    //   "category": "ddff",
    //   "type": "nncdc",
    //   "sizes": ["12","13"],
    //   "size":"10",
    //   "images": ["assets/images/2_2.jpeg", "assets/images/3_3.jpeg"],
    //   "stock": "disponible",
    //   "price": 15000,
    //   "prevprice": 10000,
    //   "qty": 2,
    //   "discount": 10,
    //   "totalprice": 200000,
    //   "rating": {
    //     "rate": 100,
    //     "count": 100,
    //   }};
    //   var productItem3:Product = {"id":3,
    //   "title": "testt",
    //   "description": "rfff",
    //   "category": "ddff",
    //   "type": "nncdc",
    //   "sizes": ["12","13"],
    //   "size":"10",
    //   "images": ["assets/images/3_3.jpeg", "assets/images/3_3.jpeg"],
    //   "stock": "disponible",
    //   "price": 15000,
    //   "prevprice": 10000,
    //   "qty": 2,
    //   "discount": 10,
    //   "totalprice": 200000,
    //   "rating": {
    //     "rate": 100,
    //     "count": 100,
    //   }};
    //   var productItem4:Product = {"id":4,
    //   "title": "testt",
    //   "description": "rfff",
    //   "category": "ddff",
    //   "type": "nncdc",
    //   "sizes": ["12","13"],
    //   "size":"10",
    //   "images": ["assets/images/3_3.jpeg", "assets/images/3_3.jpeg"],
    //   "stock": "disponible",
    //   "price": 15000,
    //   "prevprice": 10000,
    //   "qty": 2,
    //   "discount": 10,
    //   "totalprice": 200000,
    //   "rating": {
    //     "rate": 100,
    //     "count": 100,
    //   }};
    //   var productItem5:Product = {"id":5,
    //   "title": "testt",
    //   "description": "rfff",
    //   "category": "ddff",
    //   "type": "nncdc",
    //   "sizes": ["12","13"],
    //   "size":"10",
    //   "images": ["assets/images/2_2.jpeg", "assets/images/3_3.jpeg"],
    //   "stock": "disponible",
    //   "price": 15000,
    //   "prevprice": 10000,
    //   "qty": 2,
    //   "discount": 10,
    //   "totalprice": 200000,
    //   "rating": {
    //     "rate": 100,
    //     "count": 100,
    //   }};
   // this.products = [products(id)]
  //  for (let index = 6; index < 21; index++) {
   
  //   var productItem:Product = {"id": index,
  //     "title": "testt",
  //     "description": "rfff",
  //     "category": "ddff",
  //     "type": "nncdc",
  //     "sizes": ["12","13"],
  //     "size":"10",
  //     "images": ["assets/images/"+index+".jpeg"],
  //     "stock": "disponible",
  //     "price": 15000,
  //     "prevprice": 1000,
  //     "qty": 2,
  //     "discount": 10,
  //     "totalprice": 200000,
  //     "rating": {
  //       "rate": 100,
  //       "count": 100,
  //     }};
  //   this.products.push(productItem);
  //  }
    this.isLoading=true;
    //const startIndex=Math.round(Math.random()*20);
    //const lastIndex=startIndex+6;
    this._productService.get.subscribe(data=>{
      this.isLoading=false;
      this.productsFilter=data;
      this.products = this.productsFilter.slice(-12);
    },
    error=>this.error=error.message
    );
    this.cart = this.cartService.getCart
  }
  addToCart(product:Product){
    this.cartService.add(product);
  }
  removeFromCart(product:Product){
    this.cartService.remove(product);    
  }
  isProductInCart(product:Product){
    return this.cart.some(item=>item._id==product._id);
  }
}
