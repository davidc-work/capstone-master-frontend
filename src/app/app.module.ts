import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FundsComponent } from './funds/funds.component';
import { FundComponent } from './fund/fund.component';
import { HttpClientModule } from '@angular/common/http';
import { EditFundComponent } from './edit-fund/edit-fund.component';
import { AddFundComponent } from './add-fund/add-fund.component';

@NgModule({
  declarations: [
    AppComponent,
    FundsComponent,
    FundComponent,
    EditFundComponent,
    AddFundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
