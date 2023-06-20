import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SubCategoryModel } from './subcategory.model';
import { SubcategoryService } from '../services/subcategory.service';
import { CategoryService } from '../services/category.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  subcategoryForm!: FormGroup;
  subcategoryModelObj: SubCategoryModel = new SubCategoryModel();
  subcategoryData!: any;
  categoryData: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  ImageBase64!: any;
  imgname: any;
  url: any;
  catname: any;
  constructor(private fb: FormBuilder, public api: SubcategoryService, private catservice: CategoryService) { }

  ngOnInit(): void {

    this.subcategoryForm = this.fb.group({
      // 'firstName': new FormControl(),
      // 'lastName': new FormControl(),
      // 'email': new FormControl(),
      // 'mobile': new FormControl(),
      // 'salary': new FormControl(),
      'name': new FormControl(),
      'imageUrl': new FormControl(),
      'catname': new FormControl()
    })
    this.getAllCategory();


  }
  getAllCategory() {
    this.catservice.getCategory().subscribe(res => {
      this.categoryData = res;
      this.getAllsubCategory();

    })
  }
  // url =["./assets/img/flower.jpg"];
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
        this.url = event.target.result



      }

    }
  }
  clickAddsubCategory() {
    this.subcategoryForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postsubCategoryDetails() {

    this.subcategoryModelObj.name = this.subcategoryForm.value.name;
    //  this.categoryForm.value.imageUrl = this.ImageBase64;
    this.subcategoryForm.value.imageUrl = this.imgname;
    this.subcategoryModelObj.imageUrl = this.subcategoryForm.value.imageUrl;
    this.subcategoryModelObj.categoryID = this.subcategoryForm.value.catname;
    this.api.postsubCategory(this.subcategoryModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Subcategory Added Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.subcategoryForm.reset();
        this.getAllsubCategory();
      }, err => {
        alert("Something went wrong");
        console.log(err);
      })
  }
  getAllsubCategory() {
    this.api.getsubCategory().subscribe(res => {
      this.subcategoryData = res;
      for (let i = 0; i < this.subcategoryData?.length; i++) {
        const catRecord = this.categoryData.find((element: any) => element.id == this.subcategoryData[i].categoryID);
        this.subcategoryData[i].category_name = catRecord?.name;
        this.subcategoryData[i].categoryID = catRecord?.id;

      }
      console.log(this.subcategoryData);
      // this.subcategoryData.catname = this.categoryData.name;

    })
  }
  deletesubCategory(row: any) {
    this.api.deletesubCategory(row.id).subscribe(_res => {
      alert("Subcategory Deleted Successfully");
      this.getAllsubCategory();

    })
  }
  updatesubCategoryDetails() {
    this.subcategoryModelObj.name = this.subcategoryForm.value.name;
    //  this.categoryForm.value.imageUrl = this.ImageBase64;
    this.subcategoryForm.value.imageUrl = this.imgname;
    this.subcategoryModelObj.imageUrl = this.subcategoryForm.value.imageUrl;
    this.subcategoryModelObj.categoryID =this.subcategoryForm.value.catname;
    this.api.updatesubCategory(this.subcategoryModelObj, this.subcategoryModelObj.id)

      .subscribe(res => {
        console.log(res);
        alert("Updated Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.subcategoryForm.reset();
        this.getAllCategory();
      }, err => {
        alert("Something went wrong");
        console.log(err);
      })
  }
  onsubEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.subcategoryModelObj.id = row.id;
    // this.categoryForm.controls['firstName'].setValue(row.firstName);
    // this.categoryForm.controls['lastName'].setValue(row.lastName);
    // this.categoryForm.controls['email'].setValue(row.email);
    // this.categoryForm.controls['mobile'].setValue(row.mobile);
    this.subcategoryForm.controls['name'].setValue(row.name);
    this.subcategoryForm.controls['catname'].setValue(row.categoryID);
    this.subcategoryForm.controls['imageUrl'].setValue(row.imageUrl);
    this.closebutton.nativeElement.click();

  }
}


