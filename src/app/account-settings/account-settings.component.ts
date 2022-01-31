import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  @Output("editProfile") editProfile: EventEmitter<any> = new EventEmitter();
  @Output() update = new EventEmitter<any>();
  @Input() data = '';
  @Input() id = '';
  name: string = "";
  email: string = "";
  userProfile: any = {};
  customer_id: any;
  constructor(private _profile: ProfileService) { }


  // @Output() onHide = new EventEmitter<boolean>();
  // setHide(){
  //    this.onHide.emit(true);
  // }



  save() {
    console.log("AM I SAVING?")
    console.log("customer_id ",this.customer_id)
    console.log("userProfile ",this.userProfile)
    this._profile.editProfile(this.customer_id, this.userProfile).subscribe((data) => {
      console.log("Checking line 30",data)
    })
    this.update.emit(this.userProfile)
  }


  // updateProfile() {
  //   this._profile.editProfile(this.customer_id, this.userProfile).subscribe((data) => {
  //     console.log(data)
  //   })
  //   this.email = this.userProfile.email;
  //   this.name = this.userProfile.firstName + " " + this.userProfile.lastName;
  // }

  ngOnInit(): void {
    this.userProfile = this.data;
    this.name = this.userProfile.firstName + " " + this.userProfile.lastName;
    this.customer_id = this.id
  }


}
