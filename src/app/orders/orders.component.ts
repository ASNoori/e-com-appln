import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders :any = [];
  public grandTotal !: number;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getCartDetails().subscribe(res=>{
      this.orders =res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  }


