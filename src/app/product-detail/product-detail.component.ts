import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { BrandService } from '../services/brand.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { SubcategoryService } from '../services/subcategory.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productData: any;
  subcategoryData: any;
  categoryData: any;
  brandData: any;
  id: any;
  item: any;
  public totalItem: number = 0;
  public products :any = [];
  public grandTotal !: number;
  constructor(public product: ProductService, public catservice: CategoryService, public subcatservice: SubcategoryService, public brservice: BrandService, private route:ActivatedRoute,private cartService: CartService) { }

  ngOnInit(): void {

  this.cartService.getProducts().subscribe(res=>{
    this.totalItem = res.length;
  })
  this.cartService.getProducts().subscribe(res=>{
    this.products =res;
    this.grandTotal = this.cartService.getTotalPrice();
  })
    this.route.params.subscribe(params=>{
     this.id= this.getProductById(params['id'])
     this.getProductById(this.id);
    })    
   
   
  }
  
  getProductById(id:any){
    this.product.getProductDetail(id).subscribe((res=>{
          this.item = res;
          Object.assign(this.item,{quantity:1,total:this.item.pdtprice});
    }))
  }

  addtocart(item : any){
    this.cartService.addtoCart(item);
  }
}
