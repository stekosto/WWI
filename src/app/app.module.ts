import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { HeaderbarComponent } from './components/headerbar/headerbar.component';
import { FooterbarComponent } from './components/footerbar/footerbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { AppRouterModule } from './app-router/app-router.module';
import { NoContentComponent } from './components/no-content/no-content.component';
import { FiltersubPipe } from './pipes/filtersub.pipe';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingListCatComponent } from './components/shopping-list-cat/shopping-list-cat.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    ShoppingComponent,
    ProductComponent,
    CartComponent,
    HeaderbarComponent,
    FooterbarComponent,
    ContactComponent,
    AboutComponent,
    NoContentComponent,
    FiltersubPipe,
    ShoppingListComponent,
    ShoppingListCatComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
