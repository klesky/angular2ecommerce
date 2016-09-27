import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TotalPipePipe } from './total-pipe.pipe';
import { TaxPipePipe } from './tax-pipe.pipe';

//import from order.service
import { OrderService } from "./order.service";
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptSelectorComponent } from './receipt-selector/receipt-selector.component'
import {routing} from "./app.routing" //import routing

@NgModule({
  declarations: [
    AppComponent,
    TotalPipePipe,
    TaxPipePipe,
    ReceiptComponent,
    ReceiptSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing // use routing in import
  ],
  providers: [
    OrderService//add in provider so all component know it
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
