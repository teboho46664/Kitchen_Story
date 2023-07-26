import { Injectable } from '@angular/core';
import Product from 'src/app/models/product';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor(private productService:ProductService) { }

  addProduct(product:Product){

    this.productService.addProduct(product);

  }

  removeProduct(product:Product){
    this.productService.removeProductById(product.productId);
  }
}
