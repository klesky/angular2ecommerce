import { OrderService } from './../order.service';
import { Order } from './../order';
import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-receipt-selector',
  templateUrl: './receipt-selector.component.html',
  styleUrls: ['./receipt-selector.component.css']
})
export class ReceiptSelectorComponent implements OnInit {
  promise_orders: Promise<Array<Order>>;
  orders: Array<Order>
  ob_orders:Observable<Array<Order>>


  constructor(private os:OrderService) {
    //this.orders = os.getAllOrder();
    this.orders = os.load();
    this.promise_orders = os.getOrderFromURL();//sample
    this.ob_orders = os.getOrderFromURL2();//sample
   }

  ngOnInit() {
    //sample
    this.promise_orders.then(orders=>{
      //this.orders = orders;
    })

    //sample
    this.ob_orders.subscribe(data => {
      //this.orders = data;
    })
  }

  onSomething() {
    this.promise_orders.then(orders =>{
      console.log('do other stuff')
    })
  }

  loadFromURL(){
    this.os.loadDataFromURL().then(orders => {
      this.orders = orders;
    })
  }

}
