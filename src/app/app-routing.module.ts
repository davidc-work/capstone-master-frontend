import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FundComponent } from './fund/fund.component';
import { FundsComponent } from './funds/funds.component';
import { EditFundComponent } from './edit-fund/edit-fund.component';
import { AddFundComponent } from './add-fund/add-fund.component';
import { FundStocksComponent } from './fund-stocks/fund-stocks.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockComponent } from './stock/stock.component';
import { UserPortfolioComponent } from './user-portfolio/user-portfolio.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "stocks", component: StocksComponent},
  {path: "stocks/:id", component: StockComponent},
  {path: "funds", component: FundsComponent},
  {path: "funds/add", component: AddFundComponent},
  {path: "funds/:id", component: FundComponent},
  {path: "funds/:id/edit", component: EditFundComponent },
  {path: "funds/:id/stocks", component: FundStocksComponent},
  {path: "user-portfolio", component: UserPortfolioComponent},
  {path: "transaction", component: TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
