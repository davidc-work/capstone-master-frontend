import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FundComponent } from './fund/fund.component';
import { FundsComponent } from './funds/funds.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockComponent } from './stock/stock.component';
import { UserPortfolioComponent } from './user-portfolio/user-portfolio.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { TransactionSingleComponent } from './transaction-single/transaction-single.component';
import { BillingComponent } from './billing/billing.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "stocks", component: StocksComponent},
  {path: "stocks/:id", component: StockComponent},
  {path: "funds", component: FundsComponent},
  {path: "funds/:id", component: FundComponent},
  {path: "user-profile", component: UserPortfolioComponent},
  {path: "transaction", component: TransactionComponent},
  {path: "receipts/:userId/:fundId", component: TransactionSingleComponent},
  {path: "login", component: LoginPageComponent},
  {path: "signup", component: SignupPageComponent},
  {path: "transactions", component: TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
