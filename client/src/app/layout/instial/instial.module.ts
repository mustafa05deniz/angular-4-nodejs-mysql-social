import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InstialComponent } from './instial.component';
import { InstialRoutingModule } from "./instial-routing.module";
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        InstialRoutingModule,
        RouterModule,
        
    ],
    declarations: [InstialComponent]
})
export class InstialModule {}
