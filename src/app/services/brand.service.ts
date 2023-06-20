import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

constructor(private http: HttpClient) { }

postBrand(data: any){
    return this.http.post<any>("http://localhost:3000/brand",data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

getBrand(){
  return this.http.get<any>("http://localhost:3000/brand")

  .pipe(map((res: any)=>{
    return res;
  }))
}


updateBrand(data: any, id:number){
  return this.http.put<any>("http://localhost:3000/brand/"+id,data)
  .pipe(map((res: any)=>{
    return res;
  }))
}

deleteBrand(id:number){
  return this.http.delete<any>('http://localhost:3000/brand/'+id)
  .pipe(map((res: any)=>{
    return res;
  }))
}

}