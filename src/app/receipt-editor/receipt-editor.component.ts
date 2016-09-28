import { OrderItem } from './../order-item';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Order } from '../order'

@Component({
  selector: 'app-receipt-editor',
  templateUrl: './receipt-editor.component.html',
  styleUrls: ['./receipt-editor.component.css']
})
export class ReceiptEditorComponent implements OnInit {

  order: Order;
  private formDate: string;

  // will run when create instance of class
  constructor(private od: OrderService, private currentRoute: ActivatedRoute, private router: Router) {

  }

  //will run when create component
  ngOnInit() {
    this.currentRoute.params.forEach((params: Params) => {
      console.log(params['id']);
      if (params['id'] == "new") {
        this.order = new Order([], new Date())
      }
      else
        this.order = this.od.getOrder(params['id']);
      //console.log(this.od.getOrder(params['id']));
      this.formDate = this.order.create_time.toISOString().substring(0, 10);
    })
  }

  //add item in order.items
  addItem() {
    this.order.items.push(new OrderItem("", 1, 0))
  }

  //delete item in order.items
  //parameter will be declared later
  deleteItem(index: number) {
    this.order.items.splice(index, 1);
  }

  //save data to DB
  //return true if success
  validate(): boolean {
    let result = true;
    if (this.formDate == "")
      return false;
    if (this.order.items.length <= 0)
      return false;

    this.order.items.forEach(orderItem => {
      if (orderItem.item == "")
        result = false;
    })

    return result;
  }

  save(): boolean {
    if (!this.validate())
      return false;
    //we need to change formDate back to create_time
    this.order.create_time = new Date(this.formDate);
    //we need to save our order to DB(localstorage) using orderService
    this.od.updateOrder(this.order);

    return true;
  }

  onSave() {
    if (!this.save())
      alert("YOU ARE WRONG!!");
    else {
      this.router.navigate(['']);//make it navigate
      alert("SAVED");
    }

  }

  delete(): boolean {
    this.od.deleteOrder(this.order);
    return true;
  }

  onDelete() {
    if (!this.delete())
      alert("YOU ARE WRONG!!");
    else
      alert("DELETED");

    this.router.navigate(['']);//make it navigate
  }

}
