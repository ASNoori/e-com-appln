import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 public cartItemlist : any = [];
 public productData = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }
  getProducts(){
    return this.productData.asObservable();
  }

  setProduct(product : any){
    this.cartItemlist.push(...product);
    this.productData.next(product);
  }
  addtoCart(product : any){
    if( this.cartItemlist<1){
    this.cartItemlist.push(product);
    this.productData.next(this.cartItemlist);
    this.getTotalPrice();
    console.log(this.cartItemlist);
    }
    
  }
 getTotalPrice():number{
    let grandTotal = 0;
    this.cartItemlist.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product:any){
    this.cartItemlist.map((a:any,index:any)=>{
      if(product.id===a.id){
        this.cartItemlist.splice(index,1);
      }
    })
    this.productData.next(this.cartItemlist);
  }
  removeAllCart(){
    this.cartItemlist=[];
    this.productData.next(this.cartItemlist);
  }
  saveCartDetails(data:any){
    return this.http.post<any>("http://localhost:3000/cart",data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  getCartDetails(){
    return this.http.get<any>("http://localhost:3000/cart")
  
    .pipe(map((res: any)=>{
      return res;
    }))
  }
}
