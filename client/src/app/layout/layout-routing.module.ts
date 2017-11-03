import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'login', loadChildren: './local/login/login.module#LoginModule' },
            { path: 'register', loadChildren: './local/register/register.module#RegisterModule' },
            { path: 'facebook', loadChildren: './social/facebook/facebook.module#FacebookModule' },
            { path: 'twitter', loadChildren: './social/twitter/twitter.module#TwitterModule' },
            { path: 'google', loadChildren: './social/google/google.module#GoogleModule' },
            { path: 'instial', loadChildren: './instial/instial.module#InstialModule' }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
