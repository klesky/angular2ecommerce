import { ReceiptSelectorComponent } from './receipt-selector/receipt-selector.component';
//these 2 are needed to create routing
//https://angular.io/docs/ts/latest/tutorial/toh-pt5.html
import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import components that we going to use for each page

import { ReceiptComponent } from "./receipt/receipt.component"

//create appRoute constants
const appRoute:Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full' //redirect to /home not matter where this router is
    },
    {
        path:'home',
        component:ReceiptSelectorComponent
    },
    {
        path:'receipt',
        component:ReceiptComponent
    }
]

//export the routing to module
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoute)
