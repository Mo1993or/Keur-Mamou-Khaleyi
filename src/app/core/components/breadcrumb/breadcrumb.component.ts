import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, UrlSegment} from '@angular/router';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
  styles: [
  ]
})

export class BreadcrumbComponent implements OnInit{
  breadcrumbList:{path:string;label:string}[]=[];
  constructor(private router:Router,private route:ActivatedRoute){}


  listenRoute(){
    this.router.events.subscribe((router:any)=>{
      let url=router.url;
    })
    this.route.url.subscribe((url:UrlSegment[])=>{
      url.map((path:any)=>{
        this.breadcrumbList.push({
          path:path.path,
          label:path.path.charAt(0).toUpperCase()+path.path.slice(1)
        });
      })
    })
  }

  ngOnInit(): void {
  // this.route.pathFromRoot;
  // this.listenRoute();

  }
}
