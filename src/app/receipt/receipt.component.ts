import { OrderService } from './../order.service';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order'

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})

export class ReceiptComponent implements OnInit {

  @Input()
  order: Order;  
  taxRate:number
  currency:string

  constructor(od:OrderService) { 
    this.order = od.getAllOrder()[0]
  }

  ngOnInit() {
    this.taxRate = 7;
    this.currency = "MYR"
    //this.order = this.orderInput;
  }

}
