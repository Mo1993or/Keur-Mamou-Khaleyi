import { CommonModule } from '@angular/common';
import { Component, Input,OnInit, ViewChild,ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
    .carousel {
      overflow: hidden;
      width: 100vw;
      position: relative;
     
      
      
    }
    
    .items {
      display: flex;
      flex-wrap: nowrap;
      transition: transform 0.5s ease-in-out;
    }
    
    .item {
      width: 100vw;
      flex-shrink: 0;
      flex-grow: 0;
      position: left;
      height: 50vw;
    }
    
    .item img {
      width: 100vw;
      position: left;
      height: 50vw; /* Ajustez la hauteur à votre goût */
      object-fit: cover;
      
    }
    
    
    
    
    
    
    .prev, .next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      border: none;
      padding: 10px;
      cursor: pointer;
    }
    .indicators {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
    }
    
    .indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ccc;
      margin: 5px;
      cursor: pointer;
    }
    
    .indicator.active {
      background-color: #0798B3;
    }
    .prev {
      left: 0;
    }
    
    .next {
      right: 0;
    }
    
    `
    
    
    
  ]
})

export class CarouselComponent {
  items = [ "assets/images/1.png",
  "assets/images/2.png",
  "assets/images/3.png",
  "assets/images/4.png",];
  currentIndex = 0;
  transform = 'translateX(0px)';
  itemWidth = window.innerWidth;

  intervalId: any;

  ngAfterViewInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.transform = `translateX(${this.currentIndex * -this.itemWidth}px)`;
    } else {
      this.currentIndex = this.items.length - 1;
      this.transform = `translateX(${this.currentIndex * -this.itemWidth}px)`;
    }
  }

  next() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.transform = `translateX(${this.currentIndex * -this.itemWidth}px)`;
    } else {
      this.currentIndex = 0;
      this.transform = `translateX(${this.currentIndex * -this.itemWidth}px)`;
    }
  }

  goToIndex(index: number) {
    this.currentIndex = index;
    this.transform = `translateX(${this.currentIndex * -this.itemWidth}px)`;
  }
}
