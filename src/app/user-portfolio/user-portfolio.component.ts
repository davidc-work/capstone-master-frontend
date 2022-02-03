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
  arrow: any = [true,true,true,true,true];
  response: any;
  totalPrice: any;
  sell: boolean = false;
  portfolioSell: any;
  view:string = "Account";
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

  // sortPortfolio(val: any) {
  //   switch (val) {
  //     case "Price High to Low":
  //       this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
  //         return parseInt(portfolio2.price.substring(1)) - parseInt(portfolio1.price.substring(1))
  //       })
  //       this.filterButton()
  //       break;
  //     case "Price Low to High":
  //       this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
  //         return parseInt(portfolio1.price.substring(1)) - parseInt(portfolio2.price.substring(1))
  //       })
  //       this.filterButton()
  //       break;
  //     case "Quantity High to Low":
  //       this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
  //         return portfolio2.quantity - portfolio1.quantity
  //       })
  //       this.filterButton()
  //       break;
  //     case "Quantity Low to High":
  //       this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
  //         return portfolio1.quantity - portfolio2.quantity
  //       })
  //       this.filterButton()
  //       break;

      
  //     case "Sort Name Ascending":
  //       this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
  //         return (portfolio1.name > portfolio2.name) ? 1 : ((portfolio2.name > portfolio1.name) ? -1 : 0)
  //       })
  //       this.filterButton()
  //       break;
      
  //     case "Sort Name Descending":
  //       this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
  //         return (portfolio1.name > portfolio2.name ? -1 : 1)
  //       })
  //       this.filterButton()
  //       break;
      
  //     case "Sort Ticker Ascending":
  //       this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
  //         return (portfolio1.ticker > portfolio2.ticker) ? 1 : ((portfolio2.ticker > portfolio1.ticker) ? -1 : 0)
  //       })
  //       this.filterButton()
  //       break;
    
  //     case "Sort Ticker Descending":
  //       this.userPortfolio.sort((portfolio1: any, portfolio2: any) => {
  //         return (portfolio1.ticker > portfolio2.ticker ? -1 : 1)
  //       })
  //       this.filterButton()
  //       break;
  //   }
  //   this.closeAll()
  // }

  
  

  refreshPage(val:any) {
    this.edit = !this.edit;
    this.email = val.email;
    this.name = val.firstName+" "+val.lastName
  }
  
  ngOnInit(): void {
    // if (this.userData) {
    //   for (let portfolio of this.userData.ClientPortfolios) {
    //     portfolio.totalPrice = parseInt(portfolio.price.substring(1)) * parseInt(portfolio.quantity);
    //   }
    // }
    /*this._user.getAllCustomer().subscribe((data) => {
      this.userData = data[2]
      this.userProfile = this.userData.ClientProfile;
      this.userProfile.birthdate = new Date(this.userProfile.birthdate).toISOString().split('T')[0];
      this.name = this.userProfile.firstName + " " + this.userProfile.lastName;
      this.email = this.userProfile.email;
      this.customer_id = this.userData.customer_id

      console.log("checking")
      for (let i = 0; i < this.userPortfolio.length; i++) {
        this.userPortfolio["totalPrice"] = this.userPortfolio.quantity * parseInt(this.userPortfolio.price.substring(1))
        console.log("I AM HERE!!!",this.userPortfolio);
      }

      this.titleService.setTitle('RVProtect - ' + this.name);
    });*/
    /*setTimeout(() => {
      this.userPortfolio = this.userData?.ClientPortfolios;
      console.log(this.userPortfolio);
      console.log(this.userData);
    }, 500);*/
  }

  toggleView(){
    this.view === "Account" ? this.view = "Billing" : this.view = "Account";
  }
}
