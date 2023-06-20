import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: HttpClient) { }
  
postsubCategory(data: any){
    return this.http.post<any>("http://localhost:3000/subcategory",data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

getsubCategory(){
  return this.http.get<any>("http://localhost:3000/subcategory")

  .pipe(map((res: any)=>{
    return res;
  }))
}

updatesubCategory(data: any, id:number){
  return this.http.put<any>("http://localhost:3000/subcategory/"+id,data)
  .pipe(map((res: any)=>{
    return res;
  }))
}

deletesubCategory(id:number){
  return this.http.delete<any>('http://localhost:3000/subcategory/'+id)
  .pipe(map((res: any)=>{
    return res;
  }))
}

}

