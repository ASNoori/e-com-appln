import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';
import { ProductService } from '../services/product.service';
import { ProductModel } from './product.model';
import { BrandService } from '../services/brand.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  productForm!: FormGroup;
  productModelObj: ProductModel = new ProductModel();
  productData!: any;
  categoryData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  ImageBase64!: any;
  imgname: any;
  subcategories: any = [];
  subcategoryData!: any;
  brandData!: any;
  image: any =[''];
  constructor(private fb: FormBuilder, public product: ProductService, public catservice: CategoryService, public subcatservice: SubcategoryService, public brservice: BrandService) { }


  ngOnInit(): void {
    this.productForm = this.fb.group({
      'pdtname': new FormControl('some', [Validators.required]),
      'pdtdesc': new FormControl(),
      'pdtprice': new FormControl('some', [Validators.required]),
      'catname': new FormControl('some', [Validators.required]),
      'subcatname': new FormControl('some', [Validators.required]),
      'brandname': new FormControl('some', [Validators.required]),
      'imageUrl': new FormControl('', [Validators.required]),
      'imagebox': new FormControl()
    })
    this.getAllCategory();
    this.getAllSubcategory();
    this.getAllBrand();
  }
  getAllCategory() {
    this.catservice.getCategory().subscribe(res => {
      this.categoryData = res;
      this.getAllProduct();

    })
  }
  onSelect(categoryData: any) {
    console.log(categoryData.target.value);
    this.subcatservice.getsubCategory().subscribe(res => {
      this.subcategoryData = res;
      this.subcategories = this.subcategoryData.filter((e: any) => e.categoryID == categoryData.target.value);
      console.log(this.subcategories);
    })
  }
  getAllSubcategory() {
    this.subcatservice.getsubCategory().subscribe(res => {
      this.subcategoryData = res;
      this.getAllProduct();

    })
  }
  getAllBrand() {
    this.brservice.getBrand().subscribe(res => {
      this.brandData = res;
      this.getAllProduct();

    })
  }
  onProductUpload(event: any) {
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
        this.image = event.target.result;        ;
        // this.url = event.target.result

      }
     
    }
  }
  
  clickAddProduct() {
    this.productForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postProductDetails() {

    this.productModelObj.pdtname = this.productForm.value.pdtname;
    this.productModelObj.pdtdesc = this.productForm.value.pdtdesc;
    this.productModelObj.pdtprice = this.productForm.value.pdtprice;
    this.productModelObj.categoryID = this.productForm.value.catname;
    this.productModelObj.subcategoryID = this.productForm.value.subcatname;
    this.productModelObj.brandID = this.productForm.value.brandname;
    this.productForm.value.image = this.ImageBase64; //for base64 to image
    this.productModelObj.imagebox =this.productForm.value.image;//for base64 to image
    this.productForm.value.imageUrl = this.imgname;
    this.productModelObj.imageUrl = this.productForm.value.imageUrl;
    this.product.postProduct(this.productModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Product Added Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.productForm.reset();
        this.getAllProduct();
      }, err => {
        alert("Something went wrong");
        console.log(err);
      })
  }

  getAllProduct() {
    this.product.getProduct().subscribe(res => {
      this.productData = res;
      for (let i = 0; i < this.productData?.length; i++) {
        const catRecord = this.categoryData.find((element: any) => element.id == this.productData[i].categoryID);
        this.productData[i].category_name = catRecord?.name;
        this.productData[i].categoryID = catRecord?.id;
        //for subcategory
        const subcatRecord = this.subcategoryData.find((subelement: any) => subelement.id == this.productData[i].subcategoryID);
        this.productData[i].subcategory_name = subcatRecord?.name;
        this.productData[i].subcategoryID = subcatRecord?.id;

        //for brand
        const brandRecord = this.brandData.find((brelement: any) => brelement.id == this.productData[i].brandID);
        this.productData[i].brand_name = brandRecord?.name;
        this.productData[i].brandID = brandRecord?.id;

      }
    })

  }




  deleteProduct(row: any) {
    this.product.deleteProduct(row.id).subscribe(res => {
      alert("Product Deleted Successfully");
      this.getAllProduct();

    })
  }
  updateProductDetails() {
    this.productModelObj.pdtname = this.productForm.value.pdtname;
    this.productModelObj.pdtdesc = this.productForm.value.pdtdesc;
    this.productModelObj.pdtprice = this.productForm.value.pdtprice;
    this.productModelObj.categoryID = this.productForm.value.catname;
    this.productModelObj.subcategoryID = this.productForm.value.subcatname;
    this.productModelObj.brandID = this.productForm.value.brandname;

    //  this.categoryForm.value.imageUrl = this.ImageBase64;
    this.productForm.value.imageUrl = this.imgname;

    this.productModelObj.imageUrl = this.productForm.value.imageUrl;
    this.productForm.value.image = this.ImageBase64; //for base64 to image
    this.productModelObj.imagebox =this.productForm.value.image;//for base64 to image
   
    this.product.updateProduct(this.productModelObj, this.productModelObj.id)
      .subscribe(res => {
        console.log(res);
        alert("Updated Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.productForm.reset();
        this.getAllProduct();
      }, err => {
        alert("Something went wrong");
        console.log(err);
      })
  }
  onproductEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.productModelObj.id = row.id;
    this.productForm.controls['pdtname'].setValue(row.pdtname);
    this.productForm.controls['pdtdesc'].setValue(row.pdtdesc);
    this.productForm.controls['pdtprice'].setValue(row.pdtprice);
    this.productForm.controls['catname'].setValue(row.categoryID);
    this.productForm.controls['subcatname'].setValue(row.subcategoryID);
    this.productForm.controls['brandname'].setValue(row.brandID);

    this.productForm.controls['imageUrl'].setValue(row.imageUrl);
    this.closebutton.nativeElement.click();

  }
}
