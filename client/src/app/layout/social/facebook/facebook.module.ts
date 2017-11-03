import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FacebookRoutingModule } from './facebook-routing.module';
import { FacebookComponent } from './facebook.component';

@NgModule({
    imports: [
        CommonModule,
        FacebookRoutingModule
    ],
    declarations: [FacebookComponent]
})
export class FacebookModule {
}
