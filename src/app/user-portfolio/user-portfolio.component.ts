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
  filter: any = ["Price High to Low","Price Low to High", "Quantity High to Low", "Quantity Low to High","Sort Name Ascending","Sort Name Descending"]
  response: any;
  userData: UserPortfolio = {}
  userPortfolio: any = [
    {
      name: "Capital Opportunity Admiral Shares",
      ticker: "VHCAX",
      price: "$185.04",
      quantity: 2
    },
    {
      name: "Tax-Managed Balanced Admiral Shares",
      ticker: "VTMFX",
      price: "$41.68",
      quantity: 7
    },
    {
      name: "Tax-Managed Small-Cap Admiral Shares",
      ticker: "VTMSX",
      price: "$88.46",
      quantity: 2
    },
    {
      name: "Intermediate-Term Investment-Grade",
      ticker: "VFICX",
      price: "$10.06",
      quantity: 9
    },
    {
      name: "Total World Stock Index Admiral Shares",
      ticker: "VTWAX",
      price: "$36.55",
      quantity: 4
    }
  ]
  userProfile: any = {}
  name: string = "";
  email: string = "";
  customer_id: any;
  @Input() item = "";
  edit: boolean = false;
  showFilter: boolean = false;

  filterButton() {
    this.showFilter = !this.showFilter
  }

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

  sortPortfolio(val:any) {
    switch (val) {
      case "Price High to Low":
        this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
          return parseInt(portfolio2.price.substring(1)) - parseInt(portfolio1.price.substring(1))
        })
        this.filterButton()
        break;
      case "Price Low to High":
        this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
          return parseInt(portfolio1.price.substring(1)) - parseInt(portfolio2.price.substring(1))
        })
        this.filterButton()
        break;
      case "Quantity High to Low":
        this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
          return portfolio2.quantity - portfolio1.quantity
        })
        this.filterButton()
        break;
      case "Quantity Low to High":
        this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
          return portfolio1.quantity - portfolio2.quantity
        })
        this.filterButton()
        break;

      
      case "Sort Name Ascending":
        this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
          return (portfolio1.name > portfolio2.name) ? 1 : ((portfolio2.name > portfolio1.name) ? -1 : 0)
        })
        this.filterButton()
        break;
      
      case "Sort Name Descending":
        this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
          return (portfolio1.name > portfolio2.name ? -1 : 1)
        })
        this.filterButton()
        break;
    }
  }
  

  refreshPage(val:any) {
    this.edit = !this.edit;
    this.email = val.email;
    this.name = val.firstName+" "+val.lastName
  }
  
  ngOnInit(): void {
    this._user.getAllCustomer().subscribe((data) => {
      this.userData = data[2]
      this.userProfile = this.userData.ClientProfile;
      this.userProfile.birthdate = new Date(this.userProfile.birthdate).toISOString().split('T')[0];
      this.name = this.userProfile.firstName + " " + this.userProfile.lastName;
      this.email = this.userProfile.email;
      this.customer_id = this.userData.customer_id

      this.titleService.setTitle('RVProtect - ' + this.name);
    });
  }

}
