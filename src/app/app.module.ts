import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FundsComponent } from './funds/funds.component';
import { FundComponent } from './fund/fund.component';
import { HttpClientModule } from '@angular/common/http';
import { FundStocksComponent } from './fund-stocks/fund-stocks.component';
import { StocksComponent } from './stocks/stocks.component';
import { UserPortfolioComponent } from './user-portfolio/user-portfolio.component';
import { StockComponent } from './stock/stock.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserTransactionsComponent } from './user-transactions/user-transactions.component';
import { FormsModule } from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FundsComponent,
    FundComponent,
    FundStocksComponent,
    StocksComponent,
    UserPortfolioComponent,
    StockComponent,
    HomeComponent,
    TransactionComponent,
    UserTransactionsComponent,
    AccountSettingsComponent,
    LoadingComponent,
    LoginPageComponent
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
