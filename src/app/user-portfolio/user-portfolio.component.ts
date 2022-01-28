import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ProfileService } from '../profile.service';
import { PortfolioService } from '../portfolio.service';

import { UserPortfolio } from './userprofile.model';

@Component({
  selector: 'app-user-portfolio',
  templateUrl: './user-portfolio.component.html',
  styleUrls: ['./user-portfolio.component.scss']
})
export class UserPortfolioComponent implements OnInit {
  constructor(private _user: CustomerService, private _profile: ProfileService, private _portfolio: PortfolioService ) { }
  response: any;
  userData: UserPortfolio = {}
  userPortfolio: any = []
  userProfile: any = {}
  name: string = "";
  email: string = "";
  customer_id: any;

  updateProfile() {
    console.log(this.customer_id)
    console.log(this.userProfile)
    this._profile.editProfile(this.customer_id, this.userProfile).subscribe((data) => {
      console.log(data)
    })
    this.email = this.userProfile.email;
    this.name = this.userProfile.firstName + " " + this.userProfile.lastName;
  }
  
  ngOnInit(): void {
    this._user.getAllCustomer().subscribe((data) => {
      console.log(this.userData)
      this.userData = data[2]
      this.userPortfolio = this.userData.ClientPortfolios
      this.userProfile = this.userData.ClientProfile
      this.name = this.userProfile.firstName + " " + this.userProfile.lastName;
      this.email = this.userProfile.email;
      this.customer_id = this.userData.customer_id
    });
  }

}
