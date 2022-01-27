import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

import { UserPortfolio } from './userprofile.model';

@Component({
  selector: 'app-user-portfolio',
  templateUrl: './user-portfolio.component.html',
  styleUrls: ['./user-portfolio.component.scss']
})
export class UserPortfolioComponent implements OnInit {
  constructor(private config: CustomerService) { }
  response: any;
  userData: UserPortfolio = {}
  userPortfolio: any = []
  userProfile: any ={}


  

  ngOnInit(): void {
    this.config.getAllCustomer().subscribe((data) => {
      console.log(this.userData)
      this.userData = data[2]
      this.userPortfolio = this.userData.ClientPortfolios
      this.userProfile = this.userData.ClientProfile
    }
    )
  }

}
