import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundComponent } from './fund/fund.component';
import { FundsComponent } from './funds/funds.component';
import { EditFundComponent } from './edit-fund/edit-fund.component';
import { AddFundComponent } from './add-fund/add-fund.component';

const routes: Routes = [
  {path: "funds", component: FundsComponent},
  {path: "funds/add", component: AddFundComponent},
  {path: "funds/:id", component: FundComponent},
  {path: "funds/:id/edit", component: EditFundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
