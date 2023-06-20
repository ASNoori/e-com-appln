import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { CategoryModel } from './category.model';
import { ChangeDetectorRef } from '@angular/core';

// import {AngularFireStorage} from '@angular/fire/compat/storage';
// import {AngularFirestore} from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryModelObj: CategoryModel = new CategoryModel();
  categoryData!: any;

  showAdd!: boolean;
  showUpdate!: boolean;
  ImageBase64!: any;
  imgname: any;
  url: any;
  Imageloaded: boolean =false;

  constructor(private fb: FormBuilder, public api: CategoryService, ) { }
  // constructor(private fb: FormBuilder, public api:CategoryService,private fireStore: AngularFirestore,private fireStorage:AngularFirestore) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      // 'firstName': new FormControl(),
      // 'lastName': new FormControl(),
      // 'email': new FormControl(),
      // 'mobile': new FormControl(),
      // 'salary': new FormControl(),
      'name': new FormControl(),
      'imageUrl': new FormControl()
    })
    this.getAllCategory();
  }
  //  url =["./assets/img/flower.jpg"];
  onUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files;

      console.log(file);
      console.log(file[0].name);
      this.imgname = file[0].name;
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.ImageBase64 = event.target.result
        console.log(this.ImageBase64);
        // this.url = atob(this.ImageBase64);
        // this.url = event.target.result

      }

    }
  }
 
  handleImageLoad()
  {
    this.Imageloaded = true;
  }
  // onUpload($event: Event){
  //   const target = $event.target as HTMLInputElement;
  //   const file: File = (target.files as FileList)[0];
  //   console.log(file);
  //   console.log(file.name);
  //   this.convertToBase64(file)
  // };

  // convertToBase64(file: File) {
  //   const observable = new Observable((subscriber: Subscriber<any>) => {
  //     this.readFile(file, subscriber);
  //   });

  //   observable.subscribe((d) => {
  //     console.log(d);
  //     this.ImageBase64 = d;

  //   })
  // }

  // readFile(file: File, subscriber: Subscriber<any>) {
  //   const filereader = new FileReader();
  //   filereader.readAsDataURL(file);

  //  }

  clickAddCategory() {
    this.categoryForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  //  postCategoryDetails(){

  //  this.categoryModelObj.firstName = this.categoryForm.value.firstName;
  //  this.categoryModelObj.lastName = this.categoryForm.value.lastName;
  //  this.categoryModelObj.email = this.categoryForm.value.email;
  //  this.categoryModelObj.mobile = this.categoryForm.value.mobile;
  //  this.categoryModelObj.salary = this.categoryForm.value.salary;

  //  this.api.postCategory(this.categoryModelObj)
  //  .subscribe(res =>{
  //    console.log(res);
  //    alert("Category Added Successfully");
  //    let ref=document.getElementById("cancel");
  //    ref?.click();
  //    this.categoryForm.reset();
  //    this.getAllCategory();
  //  },err=>{
  //    alert("Something went wrong");
  //    console.log(err);
  //  })
  //   }
  postCategoryDetails() {

    this.categoryModelObj.name = this.categoryForm.value.name;
    this.categoryForm.value.image = this.ImageBase64;
    this.categoryForm.value.imageUrl = this.imgname;
    this.categoryModelObj.imageUrl = this.categoryForm.value.imageUrl;

    this.api.postCategory(this.categoryModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Category Added Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.categoryForm.reset();
        this.getAllCategory();
      }, err => {
        alert("Something went wrong");
        console.log(err);
      })
  }
  // postCategoryDetails(){
  //   this.categoryModelObj.name = this.categoryForm.value.name;
  //   this.categoryModelObj.imageUrl = this.categoryForm.value.imageUrl;
  //   this.api.postCategory(this.categoryModelObj);

  // }

  getAllCategory() {
    this.api.getCategory().subscribe(res => {
      this.categoryData = res;

    })
  }
  // getAllCategory(){
  //   this.api.getCategory().subscribe(res =>{
  //     this.categoryData = res.map((e: any) =>{
  //       const data = e.payload.doc.data();
  //       data.id = e.payload.doc.id;
  //       return data;
  //     })
  //   }, err =>{
  //     alert("Error while fetching category data");
  //   })
  // }

  deleteCategory(row: any) {
    this.api.deleteCategory(row.id).subscribe(res => {
      alert("Category Deleted Successfully");
      this.getAllCategory();

    })
  }
  // deleteCategory(category: any){
  //   if(window.confirm('Are you sure want to delete category?'))
  //   this.api.deleteCategory(category);
  //  }

  updateCategoryDetails() {
    this.categoryModelObj.name = this.categoryForm.value.name;
    //  this.categoryForm.value.imageUrl = this.ImageBase64;
    this.categoryForm.value.imageUrl = this.imgname;

    this.categoryModelObj.imageUrl = this.categoryForm.value.imageUrl;
    this.api.updateCategory(this.categoryModelObj, this.categoryModelObj.id)
      .subscribe(res => {
        console.log(res);
        alert("Updated Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.categoryForm.reset();
        this.getAllCategory();
      }, err => {
        alert("Something went wrong");
        console.log(err);
      })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.categoryModelObj.id = row.id;
    // this.categoryForm.controls['firstName'].setValue(row.firstName);
    // this.categoryForm.controls['lastName'].setValue(row.lastName);
    // this.categoryForm.controls['email'].setValue(row.email);
    // this.categoryForm.controls['mobile'].setValue(row.mobile);
    this.categoryForm.controls['name'].setValue(row.name);
    this.categoryForm.controls['imageUrl'].setValue(row.imageUrl);

  }
  //   updateCategoryDetails(){
  //     this.categoryModelObj.firstName = this.categoryForm.value.firstName;
  //     this.categoryModelObj.lastName = this.categoryForm.value.lastName;
  //     this.categoryModelObj.email = this.categoryForm.value.email;
  //     this.categoryModelObj.mobile = this.categoryForm.value.mobile;
  //     this.categoryModelObj.salary = this.categoryForm.value.salary;


  //     this.api.updateCategory(this.categoryModelObj, this.categoryModelObj.id)
  //  .subscribe(res =>{
  //    console.log(res);
  //    alert("Updated Successfully");
  //    let ref=document.getElementById("cancel");
  //    ref?.click();
  //    this.categoryForm.reset();
  //    this.getAllCategory();
  //  },err=>{
  //    alert("Something went wrong");
  //    console.log(err);
  //  })
  //   }

  // updateCategoryDetails(){
  //       this.categoryModelObj.name = this.categoryForm.value.name;
  //       this.categoryModelObj.imageUrl = this.categoryForm.value.imageUrl;

  //     this.api.updateCategory(this.categoryModelObj);

  //    this.getAllCategory();
  // }

}