import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AsideskeletonComponent } from "../asideskeleton/asideskeleton.component";
import { CardskeletonComponent } from "../cardskeleton/cardskeleton.component";

@Component({
    selector:'app-skeleton',
    templateUrl:'skeleton.component.html',
    standalone: true,
    imports:[CardskeletonComponent, AsideskeletonComponent, CommonModule],
    styles:[]
})

export class SkeletonComponent {
    asideSkeletons:number[]=[...new Array(3)];
    prodSkeletons:number[]=[...new Array(12)];
    constructor(){}


}