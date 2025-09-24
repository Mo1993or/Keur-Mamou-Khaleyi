import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model';
import { CartService } from 'src/app/core/services/cart.service';
import { CardskeletonComponent } from 'src/app/shared/widgets/skeleton/cardskeleton/cardskeleton.component';
import { BreadcrumbComponent } from 'src/app/core/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { ProductcardComponent } from '../productcard/productcard.component';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  standalone: true,
  imports: [CardskeletonComponent,BreadcrumbComponent, CommonModule, ProductcardComponent],
  styles: [
  ]
})
export class ProductdetailComponent implements OnInit{
  isLoading=false;
  selectedSize!:string;
  category!:string;
  cart:Product[]=[];
  productRelative:Product[]=[];
  relatedProductList:Product[]=[];
  ratingList:boolean[]=[];
  images!:string[];
  product!:Product;
  imageSrc!:string;
  selectedImage!:number;
  discount=0;
  title:string='';
  constructor(private route:ActivatedRoute, private productService:ProductService, private cartService:CartService, private router:Router){}

  ngOnInit(): void {
    this.getProduct();
    this.cart=this.cartService.getCart;
    this.route.params.subscribe(()=>{
      this.getProduct();
      this.scrollToTop();
    })
  }

  getProduct(){
    // var productItem:Product = {"id": 1,
    //   "title": "testt",
    //   "description": "rfff",
    //   "category": "ddff",
    //   "type": "nncdc",
    //   "sizes": ["12","13"],
    //   "size":"10",
    //   "images": ["assets/images/10.jpeg","assets/images/16.jpeg"],
    //   "stock": "disponible",
    //   "price": 15000,
    //   "prevprice": 0,
    //   "qty": 2,
    //   "discount": 10,
    //   "totalprice": 200000,
    //   "rating": {
    //     "rate": 100,
    //     "count": 100,
    //   }};
    this.isLoading=true;
    const id= this.route.snapshot.params['id'];
    console.log("iddd ",id)
    this.productService.getProduct(id).subscribe((data:Product)=>{
     this.isLoading=false;
      this.product=data;
      const {images}=this.product;
      this.images=images;
      this.imageSrc=data.images[0];
      this.category=data.category;
      this.title=data.title;
      this.discount=this.product&&Math.round(100-(this.product.price/this.product.prevprice)*100);
       this.getRatingStar();
      this.relatedProducts();
    });
  }
  
  scrollToTop(){
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  getRatingStar(){
    this.ratingList=[true,true,true, false];
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

  relatedProducts(){
    // var productItem:Product = {"_id": 1,
    // "title": "testt",
    // "description": "rfff",
    // "category": "ddff",
    // "type": "nncdc",
    // "sizes": ["12","13"],
    // "size":"10",
    // "images": ["assets/images/10.jpeg","assets/images/16.jpeg"],
    // "stock": "disponible",
    // "price": 15000,
    // "prevprice": 0,
    // "qty": 2,
    // "discount": 10,
    // "totalprice": 200000,
    // "rating": {
    //   "rate": 100,
    //   "count": 100,
    // }};
    //  this.relatedProductList = [productItem]
    this.isLoading=true;
    //this.productService.getRelated(this.product.type).subscribe(data=>{
      this.productService.get.subscribe(data=>{
      
        this.isLoading=false;
        this.productRelative=data;
        this.relatedProductList = []
        this.productRelative.forEach(element => {
         
          if(element.type == this.product.type && this.product._id!==element._id){
            this.relatedProductList.push(element)
          }
      });
        
      });
      
    
   
  }

  addSize(value:string,index:string){
    this.selectedSize=index;
    this.product.size=value;
  }
  onImage(value:string,index:number){
    this.imageSrc=value;
    this.selectedImage=index;
  }
  
}
