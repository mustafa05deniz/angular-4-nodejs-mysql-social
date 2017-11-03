import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
    imports: [
        HomeRoutingModule,
        RouterModule
        
    ],
    declarations: [HomeComponent]
})
export class HomeModule {}
