import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/core/user/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';
import { UserService } from 'src/app/services/firebase.user/user.service';
import { TransferModel } from '../adm.main/transfer.model';

@Component({
  selector: 'adm-groups',
  templateUrl: './adm.groups.component.html',
  styleUrls: ['./adm.groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Adm_GroupsComponent implements OnInit, OnDestroy {

  title: string = 'Admin-Groups';
  @Input() transferModel:TransferModel = null;
  @Output() titleEvent = new EventEmitter<string>();

  private allGroupsObs: any;

  newGroup: string = '';
  allGroups = [];


  constructor(
    public router: Router,
    private ref: ChangeDetectorRef,
    public authService: AuthService,
    public userService: UserService,
    ) { }

  ngOnInit() {
    this.titleEvent.emit(this.title);
    if(this.allGroupsObs){
      this.allGroupsObs.unsubscribe();
    }
    this.allGroupsObs = this.authService.adm_allAuthGroups$.subscribe(allGroups => {
      this.allGroups = allGroups;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if(this.allGroupsObs){
      this.allGroupsObs.unsubscribe();
    }
  }

  addGroup(){
    if(this.newGroup && this.newGroup != ''){
      this.authService.addAuthGroup(this.newGroup);
    }
    this.newGroup = '';
  }

}
