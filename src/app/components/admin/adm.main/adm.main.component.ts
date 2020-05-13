import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';
import { UserService } from 'src/app/services/firebase.user/user.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { TransferModel } from './transfer.model';

@Component({
  selector: 'adm-main',
  templateUrl: './adm.main.component.html',
  styleUrls: ['./adm.main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Adm_MainComponent implements OnInit {

  title: string = 'Admin-Main';
  @Input() transferModel:TransferModel = null;
  @Output() titleEvent = new EventEmitter<string>();
  @Output() segmentEvent = new EventEmitter<{ segmentModel: string, transferModel: TransferModel }>();

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.titleEvent.emit(this.title);
  }

  async presentPopover(ev: any, title, segmentModel: string, transferModels: TransferModel[]) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps: {
        title: title,
        transferModels: transferModels,
        segmentModel: segmentModel,
      }
      // translucent: true
    });
    popover.onDidDismiss().then((detail) => { 
      if(detail && detail.data && 'segmentModel' in detail.data && 'transferModel' in detail.data){
        this.changeSegment(detail.data.segmentModel, detail.data.transferModel);
      }
    });
    popover.style.cssText = '--background: #494949;';
    return await popover.present();
  }

  getBlacklistedUsers(blIDList: string[]): TransferModel[] {
    return blIDList.map(e => {
      return {
        id:e,
        display:this.userService.getProfile(e).displayName,
        additionalParameters: {subSegment:'getBlacklistedUsers'},
      }
    });
  }

  getAllUsersDisplayName(userList): TransferModel[] {
    return userList.map(e => {
      return {
        id: e.id,
        display: this.userService.getProfile(e.id).displayName,
        additionalParameters: {segmentModel:'roles'},
      }
    });
  }

  getAllGroups(groupsList): TransferModel[] {
    return groupsList.map(e => {
      return {
        id: e,
        display: e,
        additionalParameters: {subSegment:'getAllGroups'},
      }
    });
  }

  changeSegment(segment: string, transferModel: TransferModel) {
    this.segmentEvent.emit({ segmentModel: segment, transferModel: transferModel });
  }

}
