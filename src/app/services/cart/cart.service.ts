import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import Product from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();
  
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(){

  }

  addToCart(product:Product):void{

    let cartItem = this.cart.items.find(item => item.product.productId === product.productId)

    if(cartItem){
      return;
    }
    
    this.cart.items.push(new CartItem(product));
    this.setCartToLocalStorage(); 
  }

  removeFromCart(productId:number):void{
    this.cart.items =
    this.cart.items.filter(item => item.product.productId != productId); 
    this.setCartToLocalStorage(); 

  }

  changeQuanity(productId:number, quantity:number){
    let cartItem = this.cart.items.find(item => item.product.productId === productId)
    if(!cartItem)
      return; 
    else{
      cartItem.quantity = quantity;
      cartItem.price = cartItem.quantity * cartItem.product.price;
      this.setCartToLocalStorage(); 
    }
  }

 
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage(); 
  }


  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart():Cart{
    return this.cartSubject.value;
  }


  private setCartToLocalStorage():void{

 
    this.cart.totalPrice = this.cart.items.
                           reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

    this.cart.totalCount = this.cart.items.
                           reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

  
    const cartJson = JSON.stringify(this.cart); 

  
    localStorage.setItem('Cart', cartJson); 
    this.cartSubject.next(this.cart); 

  }


  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart'); 
    return cartJson ? JSON.parse(cartJson) : new Cart();
   

  }
}
