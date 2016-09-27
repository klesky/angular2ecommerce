import { OrderService } from './../order.service';
import { Order } from './../order';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-receipt-selector',
  templateUrl: './receipt-selector.component.html',
  styleUrls: ['./receipt-selector.component.css']
})
export class ReceiptSelectorComponent implements OnInit {

  orders: Array<Order>
  constructor(os:OrderService) {
    this.orders = os.getAllOrder();
   }

  ngOnInit() {
  }

}
