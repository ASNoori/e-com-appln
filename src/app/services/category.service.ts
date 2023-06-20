import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  // constructor(private afs: AngularFirestore, private fireStorage: AngularFirestore) { } 
// postCategory(data: any){
//   return this.http.post<any>("http://localhost:3000/category",data)
//   .pipe(map((res: any)=>{
//     return res;
//   }))
// }
postCategory(data: any){
    return this.http.post<any>("http://localhost:3000/category",data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
// postCategory(category: any){
//    category.id = this.afs.createId();
//    return this.afs.collection('/Category').add(category);
// }
getCategory(){
  return this.http.get<any>("http://localhost:3000/category")

  .pipe(map((res: any)=>{
    return res;
  }))
}
getCatService(){
  return this.http.get<any>("http://localhost:3000/category/id/name")

  .pipe(map((res: any)=>{
    return res;
  }))
}
// getCategory(){
//   return this.afs.collection('/Category').snapshotChanges();
// }
updateCategory(data: any, id:number){
  return this.http.put<any>("http://localhost:3000/category/"+id,data)
  .pipe(map((res: any)=>{
    return res;
  }))
}
// updateCategory(category:any){
//   this.deleteCategory(category);
//   this.postCategory(category);
// }
deleteCategory(id:number){
  return this.http.delete<any>('http://localhost:3000/category/'+id)
  .pipe(map((res: any)=>{
    return res;
  }))
}
// deleteCategory(category: any){
//   return this.afs.doc('/Category'+category.id).delete();
// }
}