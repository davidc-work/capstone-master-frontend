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

  save() {
    console.log("Save method ",this.id)
    this._profile.editProfile(this.id, this.userProfile).subscribe((data) => {
      console.log(data);
    })
    this.update.emit(this.userProfile)
  }

  cancel() {
    console.log(this.id);
    this.update.emit(this.userProfile)
  }

  ngOnInit(): void {
    this.userProfile = this.data;
    this.name = this.userProfile.firstName + " " + this.userProfile.lastName;
    this.email = this.userProfile.email
    this.customer_id = this.id
  }


}
