import { Injectable } from '@angular/core';
import {Order} from "./order"
import {OrderItem} from "./order-item"

@Injectable()
export class OrderService {

  constructor() { }

 
  getAllOrder():Array<Order>{
    let orders = [
      new Order([
        new OrderItem('TestA',1,100),
        new OrderItem('TestB',1,200),
        new OrderItem('TestC',2,250),
    ], new Date("2015-12-04")),
    new Order([
        new OrderItem('TestD',1,100),
        new OrderItem('TestE',5,200),
        new OrderItem('TestF',2,250),
    ], new Date("2015-12-04")),
    new Order([
        new OrderItem('TestD',1,100),
        new OrderItem('TestE',1,200),
        new OrderItem('TestF',2,250),
    ], new Date("2015-12-04"))]
    return orders
  }

   getOrder(id:string){
    this.getAllOrder().find((item,index,obj)=>{
      return item.id == id;
    })

    // return new Order([
    //   new OrderItem('Samsung Note7',1,2490),
    //   new OrderItem('MacBook',1,4900),
    //   new OrderItem('Ipad Mini',2,1450)
    // ], new Date("2015-12-04"));
  }


}
