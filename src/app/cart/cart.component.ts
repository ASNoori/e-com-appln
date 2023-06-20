import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products :any = [];
  public grandTotal !: number;
  public totalItem: number = 0;
public orders: any = [];
  constructor(private cartService:CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res=>{
      this.totalItem = res.length;
    })

    this.cartService.getProducts().subscribe(res=>{
      this.products =res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  placeOrder( ){
    this.cartService.saveCartDetails(this.products[0]).subscribe(res=>{
     alert("Order placed successfully");
     this.emptycart();
     this.router.navigateByUrl('/orders');
  })
}
removeItem(item:any){
  this.cartService.removeCartItem(item);
}
emptycart(){
  this.cartService.removeAllCart();
}
}
