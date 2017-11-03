import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './pages/home.module#HomeModule' },

    { path: 'layout', loadChildren: './layout/layout.module#LayoutModule' },
    { path: 'social/:token', loadChildren: './social/social.module#SocialModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
