import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BrandService } from '../services/brand.service';
import{BrandModel} from './brand.model';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brandForm!: FormGroup;
  brandModelObj: BrandModel = new BrandModel();
  brandData!: any;

  showAdd!: boolean;
  showUpdate!: boolean;
  ImageBase64!: any;
  imgname: any;
  constructor(private fb: FormBuilder, public brand: BrandService) { }

  ngOnInit(): void {
    this.brandForm = this.fb.group({
       'name': new FormControl(),
      'imageUrl': new FormControl()
    })
    this.getAllBrand();

  }
  onBrandUpload(event: any) {
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
        // this.url = event.target.result

      }
    }
  }
  clickAddBrand() {
    this.brandForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postBrandDetails() {

    this.brandModelObj.name = this.brandForm.value.name;
    this.brandForm.value.image = this.ImageBase64;
    this.brandForm.value.imageUrl = this.imgname;
    this.brandModelObj.imageUrl = this.brandForm.value.imageUrl;

    this.brand.postBrand(this.brandModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Brand Added Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.brandForm.reset();
        this.getAllBrand();
      }, err => {
        alert("Something went wrong");
        console.log(err);
      })
  }

  getAllBrand() {
    this.brand.getBrand().subscribe(res => {
      this.brandData = res;

    })
  }

  deleteBrand(row: any) {
    this.brand.deleteBrand(row.id).subscribe(res => {
      alert("Brand Deleted Successfully");
      this.getAllBrand();

    })
  }
  updateBrandDetails() {
    this.brandModelObj.name = this.brandForm.value.name;
    //  this.categoryForm.value.imageUrl = this.ImageBase64;
    this.brandForm.value.imageUrl = this.imgname;

    this.brandModelObj.imageUrl = this.brandForm.value.imageUrl;
    this.brand.updateBrand(this.brandModelObj, this.brandModelObj.id)
      .subscribe(res => {
        console.log(res);
        alert("Updated Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.brandForm.reset();
        this.getAllBrand();
      }, err => {
        alert("Something went wrong");
        console.log(err);
      })
  }
  onbrandEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.brandModelObj.id = row.id;
    this.brandForm.controls['name'].setValue(row.name);
    this.brandForm.controls['imageUrl'].setValue(row.imageUrl);

  }
}
