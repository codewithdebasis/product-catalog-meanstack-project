import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppHomeComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from  './add-product/add-product.component';
import { LoginComponent } from './login/login.component';

import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { JwtInterceptor } from './shared/jwtinterceptor.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppHomeComponent,
    MenuComponent,
    ProductListComponent,
    ProductComponent,
    AddProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiService,AuthService,AuthGuard,
            { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppHomeComponent]
})
export class ProductManagerModule { }
