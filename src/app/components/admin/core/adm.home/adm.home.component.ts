import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';
import { TransferModel } from '../../adm.main/transfer.model';

@Component({
  selector: 'adm-home',
  templateUrl: './adm.home.component.html',
  styleUrls: ['./adm.home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Adm_HomeComponent implements OnInit {

  title: string = 'Admin';
  @Input() segmentModel: string = 'adm-main';
  @Input() transferModel: TransferModel = null;

  constructor(
    public router: Router,
    private ref: ChangeDetectorRef,
    public authService: AuthService,
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {}

  ionViewDidEnter() {}

  segmentChanged(event){
    this.segmentModel = event.detail.value;
    this.ref.markForCheck();
  }

  changeTitleEvent(title: string){
    if(title){
      this.title = title;
      this.ref.markForCheck();
    }
  }

  changeSegmentEvent(segment: {segmentModel:string, transferModel: TransferModel}){
    if(segment){
      this.segmentModel = segment.segmentModel;
      this.transferModel = segment.transferModel;
      this.ref.markForCheck();
    }
  }

}
