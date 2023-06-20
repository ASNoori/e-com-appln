import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  postProduct(data: any){
      return this.http.post<any>("http://localhost:3000/product",data)
      .pipe(map((res: any)=>{
        return res;
      }))
    }
  
  getProduct(){
    return this.http.get<any>("http://localhost:3000/product")
  
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  
  
  updateProduct(data: any, id:number){
    return this.http.put<any>("http://localhost:3000/product/"+id,data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  
  deleteProduct(id:number){
    return this.http.delete<any>('http://localhost:3000/product/'+id)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  updateProductDetail(data: any, id:number){
    return this.http.put<any>("http://localhost:3000/product/"+id,data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  getProductDetail(id:any){
    return this.http.get<any>('http://localhost:3000/product/'+id)
  }
  }
  