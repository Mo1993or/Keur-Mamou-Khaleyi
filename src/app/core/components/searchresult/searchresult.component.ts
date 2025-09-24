import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Product } from 'src/app/modules/product/model';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { SkeletonComponent } from 'src/app/shared/widgets/skeleton/product/skeleton.component';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  standalone: true,
  imports: [SkeletonComponent,RouterModule,CommonModule],
  styles: [
  ]
})
export class SearchresultComponent implements OnInit{
  products:Product[]=[];
  isLoading = false;
  error!:string;
  searchKeyword!:string;
  constructor(private productService:ProductService, private route:ActivatedRoute){
  }
  ngOnInit(): void {
    this.getResults();
  }
  getResults(){
    this.isLoading = true;
    this.route.queryParams.subscribe((params:Params)=>{
      this.searchKeyword=params['q'];
      this.productService.search(params['q']).subscribe((data)=>{
      this.isLoading = false;
      this.products=data
    },error=>this.error=error.message)
    })
  }
  
  
}
