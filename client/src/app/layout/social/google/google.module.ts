import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GoogleRoutingModule } from './google-routing.module';
import { GoogleComponent } from './google.component';

@NgModule({
    imports: [
        CommonModule,
        GoogleRoutingModule
    ],
    declarations: [GoogleComponent]
})
export class GoogleModule {
}
