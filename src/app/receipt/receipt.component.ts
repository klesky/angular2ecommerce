import { OrderService } from './../order.service';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order'
//get data from router
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(private od:OrderService, private currentRoute:ActivatedRoute) { 
    //this.order = od.getAllOrder()[0]
    this.taxRate = 7;
    this.currency = "MYR"
  }

  ngOnInit() {
    //this.order = this.orderInput;
    this.currentRoute.params.forEach((params:Params) => {
      console.log(params['id']);
      this.order = this.od.getOrder(params['id']);
      console.log(this.od.getOrder(params['id']));
    })
  }

}
