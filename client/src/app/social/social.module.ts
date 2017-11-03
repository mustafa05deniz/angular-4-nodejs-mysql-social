import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocialRoutingModule} from './social-routing.module';
import { SocialComponent } from './social.component';

@NgModule({
    imports: [
        SocialRoutingModule,
        RouterModule
    ],
    declarations: [SocialComponent]
})
export class SocialModule {}
