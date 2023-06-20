import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../services/brand.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { SubcategoryService } from '../services/subcategory.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productData: any;
  subcategoryData: any;
  categoryData: any;
  brandData: any;
  public totalItem: number = 0;
  constructor(public product: ProductService, public catservice: CategoryService, public subcatservice: SubcategoryService, public brservice: BrandService,private cartService : CartService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this. getAllProduct();
    this.cartService.getProducts().subscribe(res=>{
      this.totalItem = res.length;
    })
  }
 
addtocart(item : any){
  this.cartService.addtoCart(item);
 
}

  getAllProduct() {
    this.product.getProduct().subscribe(res => {
      this.productData = res;
      this.productData.forEach((a : any) => {
        Object.assign(a,{quantity:1,total:a.pdtprice});
      });
    //   if(this.productData&&this.productData.length){
    //   for (let i = 0; i < this.productData?.length; i++) {
    //     const catRecord = this.categoryData.find((element: any) => element.id == this.productData[i].categoryID);
    //     this.productData[i].category_name = catRecord?.name;
    //     this.productData[i].categoryID = catRecord?.id;
    //     //for subcategory
    //     const subcatRecord = this.subcategoryData.find((subelement: any) => subelement.id == this.productData[i].subcategoryID);
    //     this.productData[i].subcategory_name = subcatRecord?.name;
    //     this.productData[i].subcategoryID = subcatRecord?.id;

    //     //for brand
    //     const brandRecord = this.brandData.find((brelement: any) => brelement.id == this.productData[i].brandID);
    //     this.productData[i].brand_name = brandRecord?.name;
    //     this.productData[i].brandID = brandRecord?.id;

    //   }
    // }
    })
  
  }
}
