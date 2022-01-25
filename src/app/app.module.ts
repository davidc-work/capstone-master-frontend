import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FundsComponent } from './funds/funds.component';
import { FundComponent } from './fund/fund.component';
import { HttpClientModule } from '@angular/common/http';
import { EditFundComponent } from './edit-fund/edit-fund.component';
import { AddFundComponent } from './add-fund/add-fund.component';
import { FundStocksComponent } from './fund-stocks/fund-stocks.component';
import { StocksComponent } from './stocks/stocks.component';
import { UserPortfolioComponent } from './user-portfolio/user-portfolio.component';
import { StockComponent } from './stock/stock.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserTransactionsComponent } from './user-transactions/user-transactions.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FundsComponent,
    FundComponent,
    EditFundComponent,
    AddFundComponent,
    FundStocksComponent,
    StocksComponent,
    UserPortfolioComponent,
    StockComponent,
    HomeComponent,
    TransactionComponent,
    UserTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
