import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';
import { UserService } from 'src/app/services/firebase.user/user.service';
import { User } from 'src/app/models/core/user/user';
import { TransferModel } from '../adm.main/transfer.model';

@Component({
  selector: 'adm-users',
  templateUrl: './adm.users.component.html',
  styleUrls: ['./adm.users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Adm_UsersComponent implements OnInit, OnDestroy {

  title: string = 'Admin-Users';
  @Input() transferModel: TransferModel = null;
  @Output() titleEvent = new EventEmitter<string>();
  segmentModel = 'groups';

  private dropRolesObs: any;
  private allRolesObs: any;
  private userObs: any;
  private dropGroupsObs: any;
  private allGroupsObs: any;

  selectedUser: User;
  selectedRoles = [];
  allRoles = [];
  selectedGroups = [];
  allGroups = [];
  newGroup: string;


  constructor(
    public router: Router,
    private ref: ChangeDetectorRef,
    private dragulaService: DragulaService,
    public authService: AuthService,
    public userService: UserService,
  ) { }

  ngOnDestroy(): void {
    if (this.allRolesObs) {
      this.allRolesObs.unsubscribe();
    }
    if (this.dropRolesObs) {
      this.dropRolesObs.unsubscribe();
    }
    if (this.userObs) {
      this.userObs.unsubscribe();
    }
    if(this.allGroupsObs){
      this.allGroupsObs.unsubscribe();
    }
    if(this.dropGroupsObs){
      this.dropGroupsObs.unsubscribe();
    }

    this.dragulaService.destroy('user_bag');
    this.dragulaService.destroy('groups_bag');
  }

  ngOnInit(): void {
    this.titleEvent.emit(this.title);
    if (this.transferModel && 'id' in this.transferModel) {
      if (this.userObs) {
        this.userObs.unsubscribe();
      }
      this.segmentModel = this.transferModel.additionalParameters['segmentModel'];
      this.userObs = this.userService.getUser$(this.transferModel.id).subscribe(e => {
        this.selectedUser = e;
        this.userChanged(null);
      });
    }
    this.dropRolesObs = this.dragulaService.dropModel('user_bag')
      .subscribe(({ el, target, source, item, sourceModel, targetModel, sourceIndex, targetIndex }) => {
        if (el.classList.contains("empty_item")) {
          return false;
        }
        if (target.id === 'selectedRoles') {
          this.selectedUser.roles = targetModel
        }
        if (source.id === 'selectedRoles') {
          this.selectedUser.roles = sourceModel
        }
        this.userService.setUser(this.selectedUser);
      });

    this.dragulaService.createGroup('user_bag', {
      moves: (el, container, handle, sibling) => {
        if (el.classList.contains("empty_item")) {
          return false;
        }
        return true;
      }
    });
    this.dropGroupsObs = this.dragulaService.dropModel('groups_bag')
      .subscribe(({ el, target, source, item, sourceModel, targetModel, sourceIndex, targetIndex }) => {
        if (el.classList.contains("empty_item")) {
          return false;
        }
        if (target.id === 'selectedGroups') {
          this.selectedUser.groups = targetModel;
        }
        if (source.id === 'selectedGroups') {
          this.selectedUser.groups = sourceModel;
        }
        this.userService.setUser(this.selectedUser);
      });

    this.dragulaService.createGroup('groups_bag', {
      moves: (el, container, handle, sibling) => {
        if (el.classList.contains("empty_item")) {
          return false;
        }
        return true;
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return true
      }
    });
  }

  compareById(o1, o2) {
    return o1.id === o2.id;
  }

  segmentChanged(event) {
    this.segmentModel = event.detail.value;
    this.ref.markForCheck();
  }

  userChanged(ev) {
    this.selectedRoles = this.selectedUser.roles;
    if (!this.selectedRoles) {
      this.selectedRoles = [];
    }
    if (this.allRolesObs) {
      this.allRolesObs.unsubscribe();
    }
    this.allRolesObs = this.authService.adm_allAuthRoles$.subscribe(allRoles => {
      this.allRoles = allRoles;
      this.allRoles = allRoles.filter(x => !this.selectedRoles.includes(x));
      this.ref.markForCheck();
    });

    this.selectedGroups = this.selectedUser.groups;
    if(!this.selectedGroups){
      this.selectedGroups = [];
    }
    if(this.allGroupsObs){
      this.allGroupsObs.unsubscribe();
    }
    this.allGroupsObs = this.authService.adm_allAuthGroups$.subscribe(allGroups => {
      this.allGroups = allGroups;
      this.allGroups = allGroups.filter(x => !this.selectedGroups.includes(x));
      this.ref.markForCheck();
    });
  }

  addGroup(){
    if(this.newGroup && this.newGroup != ''){
      this.authService.addAuthGroup(this.newGroup);
    }
    this.newGroup = '';
  }

  blacklistChanged(ev) {
    if (ev.detail.checked === true) {
      this.authService.addUserToBlacklist(this.selectedUser);
    }
    if (ev.detail.checked === false) {
      this.authService.removeUserToBlacklist(this.selectedUser);
    }
  }

}
