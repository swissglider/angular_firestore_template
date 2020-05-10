import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';

@Component({
  selector: 'adm-home',
  templateUrl: './adm.home.component.html',
  styleUrls: ['./adm.home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Adm_HomeComponent implements OnInit {

  title: string = 'Admin';
  segmentModel: string = 'adm-main'

  constructor(
    public router: Router,
    private ref: ChangeDetectorRef,
    public authService: AuthService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {}

  ionViewDidEnter() {}

  segmentChanged(event){
    this.segmentModel = event.detail.value
    this.ref.markForCheck();
  }

  // segmentChanged(ev: any) {
  //   this.router.navigate([ev.detail.value]);
  //   this.ref.markForCheck();
  // }

}
