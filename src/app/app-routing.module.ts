import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import {SignupComponent } from './signup/signup.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},

  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'user', component:UserComponent},
  {path:'category', component:CategoryComponent},
  {path:'subcategory', component:SubcategoryComponent},
  {path:'brand', component:BrandComponent},
  {path:'product', component:ProductComponent},
  {path:'products', component:ProductsComponent},
  {path:'orders', component:OrdersComponent},
  {path:'cart',component:CartComponent},
  {path:'product-detail/:id',component:ProductDetailComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
