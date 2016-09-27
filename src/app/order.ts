import { OrderItem } from "./order-item"

export class Order {
    id:string
    create_time:Date;
    items:Array<OrderItem>

    constructor(items:Array<OrderItem>, date?:Date){
        let now = new Date()
        this.id = now.getTime() + "-" + Math.floor(Math.random()*100)
        if(!date)
            this.create_time = now
        else
            this.create_time = date;
        this.items = items
    }

    getTotal():number{
        let sum = 0;
        this.items.forEach((orderItem:OrderItem, index:number, arr:OrderItem[])=>{
            sum+=(orderItem.quantity * orderItem.unit_price)
        })
        return sum ;
    }

}

