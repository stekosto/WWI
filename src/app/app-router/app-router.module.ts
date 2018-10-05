import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { CartComponent } from '../components/cart/cart.component';
import { ShoppingComponent } from '../components/shopping/shopping.component';
import { ProductComponent } from '../components/product/product.component';
import { ContactComponent } from '../components/contact/contact.component';
import { AboutComponent } from '../components/about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from '../components/no-content/no-content.component';

const routes: Routes = [
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product', component: ProductComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NoContentComponent }

];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  declarations: []
})
export class AppRouterModule { }
