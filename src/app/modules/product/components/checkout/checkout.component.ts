import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from '../../model';
import { Order } from '../../model/Product.model';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  styles: [
    `
    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: spin 2s linear infinite;
      margin-right: 10px;
    }
    
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `
  ],
  
})
export class CheckoutComponent implements OnInit{
  gstAmount!:number;
  grandTotal!:number;
  shippingForm!:FormGroup;
  cart:Product[]=[];
  items:Order[]=[];
  isLoading = false;
  constructor(private cartService:CartService, private formBulider:FormBuilder){
    this.shippingForm=this.formBulider.group({
      firstName:new FormControl('', [Validators.required, Validators.minLength(1),Validators.maxLength(15)]),
      lastName:new FormControl('', [Validators.minLength(1),Validators.maxLength(15)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      mobile:new FormControl('',[Validators.required,Validators.minLength(10)]),
      address:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required]),
      country:new FormControl('India',[Validators.required]),
      postalCode:new FormControl('',[Validators.required]),
    })
  }
  ngOnInit(): void {
    this.getTotal();
   
  }
  getTotal(){
    this.cartService.gstAmount.subscribe(data=>this.gstAmount=parseInt(data.toFixed(2)));
    this.cartService.estimatedTotal.subscribe(data=>this.grandTotal=parseInt(data.toFixed(2)));

  }
  

  get firstName(){
    return this.shippingForm.get('firstName');
  }
  get lastName(){
    return this.shippingForm.get('lastName');
  }
  get email(){
    return this.shippingForm.get('email');
  }
  get mobile(){
    return this.shippingForm.get('mobile');
  }
  get address(){
    return this.shippingForm.get('address');
  }
  // get state(){
  //   return this.shippingForm.get('state');
  // }
  // get city(){
  //   return this.shippingForm.get('city');
  // }
  // get country(){
  //   return this.shippingForm.get('country');
  // }
  // get postalCode(){
  //   return this.shippingForm.get('postalCode');
  // }
  calculerTotal(commande: Order): number {
    return commande.quantity * commande.price;
  }
  
 // 11800
  
  onSave(){
   
   // this.shippingForm.reset();

    this.cart = this.cartService.getCart;
    
    console.log("JSON.stringify(this.shippingForm.value) $", JSON.stringify(this.shippingForm.value));
    console.log("tesssttt $", this.cart);
    
   
    
    var totalAmount:number = 0;
    
   
    
    this.cart.forEach(element => {
      const commande: Order = {
        "product": element._id,
        "quantity": element.qty ?? 0,
        "price": element.price
      };
      
      totalAmount = totalAmount + this.calculerTotal(commande);
      this.items.push(commande);
    });
    console.log("tesssttt commande", this.items);
    console.log("tesssttt totalAmount", totalAmount);

    var data = {
      "items": this.items,
      "totalAmount": totalAmount,
      "address": this.shippingForm.value.address,
      "personalInfo": {
        "firstName": this.shippingForm.value.firstName,
        "lastName": this.shippingForm.value.lastName,
        "phoneNumber": this.shippingForm.value.mobile,
        "email": this.shippingForm.value.email
      }
    }
    console.log("tesssttt data", data);
    this.isLoading = true;
  
    this.cartService.submitOrder(data).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        
        alert("Votre commande a été bien prise en compte. Nous vous contacterons dans les meilleurs délais");
        this.shippingForm.reset();
      },
      (error) => {
        console.error(error);
        alert("Vérifier si tout les champs sont bien remplis");
        this.isLoading = false;
      }
    );
  


  }
  
}
