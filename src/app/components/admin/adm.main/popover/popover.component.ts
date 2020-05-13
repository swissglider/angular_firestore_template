import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UserService } from 'src/app/services/firebase.user/user.service';
import { PopoverController } from '@ionic/angular';
import { TransferModel } from '../transfer.model';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent implements OnInit {

  @Input() title: string;
  @Input() transferModels: TransferModel;
  @Input() segmentModel: string;

  constructor(
    public userService: UserService,
    private popoverController: PopoverController,
  ) {
  }

  ngOnInit() {
  }

  async onClick(transferModel: TransferModel) {
    await this.popoverController.dismiss({ segmentModel: this.segmentModel, transferModel: transferModel });
  }

}
