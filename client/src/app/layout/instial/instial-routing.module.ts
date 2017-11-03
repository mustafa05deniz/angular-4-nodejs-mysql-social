import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {InstialComponent} from "./instial.component";

const routes: Routes = [
  {path: '', component: InstialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstialRoutingModule {
}
