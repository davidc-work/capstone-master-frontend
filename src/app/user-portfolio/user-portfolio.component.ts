import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomerService } from '../customer.service';
import { ProfileService } from '../profile.service';
import { PortfolioService } from '../portfolio.service';
import { BillingComponent } from '../billing/billing.component';
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

  userData: any;
  filter: any = ["Price High to Low", "Price Low to High", "Quantity High to Low", "Quantity Low to High", "Sort Name Ascending", "Sort Name Descending"]
  arrow: any = [true, true, true, true, true];
  headers: any = ["Name","Ticker", "Price", "Quantity","Total","Sell"]
  response: any;
  totalPrice: any;
  sell: boolean = false;
  portfolioSell: any;
  view:string = "Account";
  notificationComponent: any;

  userPortfolio: any = '';
  userProfile: any = {}
  name: string = "";
  email: string = "";
  customer_id: any;
  @Input() item = "";
  edit: boolean = false;
  showFilter: boolean = false;
  
  filterDetails: any = [
    {
    name: ["Sort Name Ascending","Sort Name Descending"],
    type: "name",
    toShow: false
  },
    {
      name: ["Sort Ticker Ascending","Sort Ticker Descending"],
      type: "ticker",
      toShow: false
    },
    {
      name: ["Price High to Low","Price Low to High"],
      type: "price",
      toShow: false
    },
      {
        name: ["Quantity High to Low","Quantity Low to High"],
        type: "quantity",
        toShow: false
      }
  ]
  filterName: boolean = false;
  filterTicker: boolean = false;
  filterPrice: boolean = false;
  filterQuantity: boolean = false;

  test(type: string) {
    for (let filter of this.filterDetails){
      if (filter.type == type) {
        filter.toShow = !filter.toShow
      }
    }
  }

  toSell(data?: any) {
    this.sell = !this.sell
    if(data){
      this.portfolioSell = data;
    }
  }

addComma(x:any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}


  closeAll() {
    this.filterName = false;
    this.filterPrice = false;
    this.filterQuantity = false;
    this.filterTicker = false;
  }

  arrowSwitcher(index:any) {
    for (let i = 0; i < this.arrow.length; i++){
      if (index == i) {
        this.arrow[i] = !this.arrow[i];
      } else {
        this.arrow[i] = true;
      }
    }
  }

  chosenFilter(val: string) {
    console.log(this.userData)
    switch (val) {
      case "name":
        this.arrowSwitcher(0)
        if (this.filterName) {
          this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            return (portfolio1.fundData.name > portfolio2.fundData.name ? -1 : 1)
          })
        } else {
          this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            return (portfolio1.fundData.name > portfolio2.fundData.name) ? 1 : ((portfolio2.fundData.name > portfolio1.fundData.name) ? -1 : 0)
          })
        }
        this.filterName = !this.filterName
        break;
      case "ticker":
        this.arrowSwitcher(1)
        if (this.filterTicker) {
          this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            return (portfolio1.fundData.ticker > portfolio2.fundData.ticker ? -1 : 1)
          })
        } else {
          this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            return (portfolio1.fundData.ticker > portfolio2.fundData.ticker) ? 1 : ((portfolio2.fundData.ticker > portfolio1.fundData.ticker) ? -1 : 0)
          })
        }
        this.filterTicker = !this.filterTicker
        break;
      case "price":
        this.arrowSwitcher(2)
        if (this.filterPrice) {
          this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            return parseInt(portfolio1.fundData.price.substring(1)) - parseInt(portfolio2.fundData.price.substring(1))
          })
        } else {
          this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            return parseInt(portfolio2.fundData.price.substring(1)) - parseInt(portfolio1.fundData.price.substring(1))
          })
        }
        this.filterPrice = !this.filterPrice
        break;
      case "quantity":
        this.arrowSwitcher(3)
        if (this.filterQuantity) {
          this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            return portfolio1.quantity - portfolio2.quantity
          })
        } else {
          this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            return portfolio2.quantity - portfolio1.quantity
          })
        }
        this.filterQuantity = !this.filterQuantity
        break;
      
      case "total":
        this.arrowSwitcher(4)
        if (this.filterPrice) {
            this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            return portfolio1.quantity*portfolio1.fundData.price.substring(1) - portfolio2.quantity*portfolio2.fundData.price.substring(1)
          })
        } else {
          this.userData.ClientPortfolios.sort((portfolio1: any, portfolio2: any) => {
            console.log(portfolio2.quantity*portfolio2.fundData.price.substring(1))
            return portfolio2.quantity*portfolio2.fundData.price.substring(1) - portfolio1.quantity*portfolio1.fundData.price.substring(1)
          })
        }
        this.filterPrice = !this.filterPrice
        break;
    }
  }

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
  
  refreshPage(val:any) {
    this.edit = !this.edit;
    this.email = val.email;
    this.name = val.firstName+" "+val.lastName
  }
  
  ngOnInit(): void {
    if (this.userData) {
      for (let portfolio of this.userData.ClientPortfolios) {
        portfolio.totalPrice = parseInt(portfolio.price.substring(1)) * parseInt(portfolio.quantity);
      }
    }
  }

  toggleView(){
    this.view === "Account" ? this.view = "Billing" : this.view = "Account";
  }
}
