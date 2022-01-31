import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  constructor(private titleService: Title, private _user: CustomerService, private _profile: ProfileService, private _portfolio: PortfolioService ) {
    titleService.setTitle('RVProtect - Profile');
  }

  response: any;
  userData: UserPortfolio = {}
  userPortfolio: any = []
  userProfile: any = {}
  name: string = "";
  email: string = "";
  customer_id: any;
  @Input() item = "";
  edit: boolean = false;

  updateProfile() {
    this._profile.editProfile(this.customer_id, this.userProfile).subscribe((data) => {
      console.log(data)
    })
    this.email = this.userProfile.email;
    this.name = this.userProfile.firstName + " " + this.userProfile.lastName;

    this.titleService.setTitle('RVProtect - ' + this.name);
  }

  editProfile() {
    this.edit = !this.edit;
    this.item = this.userProfile;
  }
  

  refreshPage(val:any) {
    this.edit = !this.edit;
    this.email = val.email;
    this.name = val.firstName+" "+val.lastName
  }
  
  ngOnInit(): void {
    this._user.getAllCustomer().subscribe((data) => {
      this.userData = data[2]
      this.userPortfolio = this.userData.ClientPortfolios
      this.userProfile = this.userData.ClientProfile;
      this.userProfile.birthdate = new Date(this.userProfile.birthdate).toISOString().split('T')[0];
      this.name = this.userProfile.firstName + " " + this.userProfile.lastName;
      this.email = this.userProfile.email;
      this.customer_id = this.userData.customer_id

      this.titleService.setTitle('RVProtect - ' + this.name);
    });
  }

}
