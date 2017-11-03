import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from "./profile-routing.module";
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        RouterModule,
        
    ],
    declarations: [ProfileComponent]
})
export class ProfileModule {}
