import { Injectable } from '@angular/core';
import { Order } from "./order"
import { OrderItem } from "./order-item"
import { Http } from "@angular/http" //inject to constructor
import { Operator, Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'

const ORDERS = [
  new Order([
    new OrderItem('TestA', 1, 100),
    new OrderItem('TestB', 1, 200),
    new OrderItem('TestC', 2, 250),
  ], new Date("2015-12-04")),
  new Order([
    new OrderItem('TestD', 1, 100),
    new OrderItem('TestE', 5, 200),
    new OrderItem('TestF', 2, 250),
  ], new Date("2015-12-04")),
  new Order([
    new OrderItem('TestD', 1, 100),
    new OrderItem('TestE', 1, 200),
    new OrderItem('TestF', 2, 250),
  ], new Date("2015-12-04"))]

const LOCAL_KEY: string = "order_key"
const URL:string = "data/orders.json"

@Injectable()
export class OrderService {

  constructor(private http:Http) {
    //make everytime we call this service load all data to _orders
    this.load()
  }
  private _orders: Array<Order>;

  //save data to localstorage
  save() {
    localStorage[LOCAL_KEY] = JSON.stringify(this._orders);
  }

  //load orderitem data from local storage
  //if there is no data give it initial data
  load(): Array<Order> {
    let string_data = localStorage[LOCAL_KEY];
    let order_array;
    if (typeof string_data == "undefined") {
      this._orders = this.loadData(ORDERS);
      this.save();
    }
    else {
      //when we found data
      order_array = JSON.parse(string_data);
      this._orders = this.loadData(order_array)
    }

    return this._orders
  }

  getAllOrder(): Array<Order> {
    return this._orders;
  }

  getOrder(id: string) {
    return this.getAllOrder().find((item) => {
      return item.id == id;
    })

  }

  updateOrder(order: Order) {
    //find index of order in _orders
    let index = this._orders.findIndex(item => {
      return item.id == order.id
    })
    console.log("index: " + index);
    if (index == -1)
      this._orders.push(order);
    else {
      //replace _orders[index] with order
      this._orders[index] = order;
    }

    //save()
    this.save();
  }

  deleteOrder(order: Order) {
    //find index of order in _orders
    let index = this._orders.findIndex(item => {
      return item.id == order.id
    })
    this._orders.splice(index, 1);
    //save()
    this.save();
  }

  loadData(orders_json_array: Array<any>) {
    let orders: Array<Order> = [];
    orders_json_array.forEach((orderItem, index, arr) => {
      let items: Array<OrderItem> = [];
      orderItem.items.forEach((item, item_index, item_arr) => {
        items.push(new OrderItem(item.item, item.quantity, item.unit_price))
      })
      let order = new Order(items, new Date(orderItem.create_time))
      order.id = orderItem.id;
      orders.push(order);
    })
    return orders;
  }

  /*getOrderFromUrl(callback:Function){
    this.http/get(URL).subscribe(resp =>)
  }*/
  //sample
  getOrderFromURL():Promise<Array<Order>>{
    return this.http.get(URL).toPromise()
      .then(resp => this.loadData(resp.json()))
      .catch(reason => [])
  };
  
  //sample
  getOrderFromURL2():Observable<Array<Order>>{
    return this.http.get(URL).map(resp =>{
      return this.loadData(resp.json()) 
    })
  }

  loadDataFromURL():Promise<Array<Order>>{
    return this.http.get(URL).toPromise().then(resp =>{
      this._orders = this.loadData(resp.json())
      this.save();
      return this._orders;
    })
  }

}
