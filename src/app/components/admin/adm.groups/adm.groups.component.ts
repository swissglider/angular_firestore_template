import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/core/user/user';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';
import { UserService } from 'src/app/services/firebase.user/user.service';

@Component({
  selector: 'adm-groups',
  templateUrl: './adm.groups.component.html',
  styleUrls: ['./adm.groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Adm_GroupsComponent implements OnInit, OnDestroy {
  
  private dropObs: any;
  private allGroupsObs: any;

  selectedUser: User;
  selectedGroups = [];
  allGroups = [];
  deleteGroups = []
  newGroup:string;

  constructor(
    public router: Router,
    private ref: ChangeDetectorRef,
    private dragulaService: DragulaService,
    public authService: AuthService,
    public userService: UserService,
    ) { }

  ngOnInit() {
    this.dropObs = this.dragulaService.dropModel('groups_bag')
    .subscribe(({ el, target, source, item, sourceModel, targetModel, sourceIndex, targetIndex }) => {
      if(el.classList.contains("empty_item")){
        return false;
      }
      this.ref.markForCheck();
      if(target.id === 'deleteGroups' && source.id === 'allGroups'){
        alert('Group will be deleted')
        this.authService.deleteAuthGroup(item);
        this.deleteGroups = [];
      }
      if(target.id === 'selectedGroups'){
        this.selectedUser.groups = targetModel;
      }
      if(source.id === 'selectedGroups' && target.id !== 'deleteGroups'){
        this.selectedUser.groups = sourceModel;
      }
      this.userService.setUser(this.selectedUser);
    });

    this.dragulaService.createGroup('groups_bag', {
      moves: (el, container, handle, sibling) => {
        if(el.classList.contains("empty_item")){
          return false;
        }
        return true;
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        if(target.id === 'deleteGroups' && source.id === 'selectedGroups'){
          return false;
        }
        return true
      }
    });
  }

  ngOnDestroy(): void {
    if(this.allGroupsObs){
      this.allGroupsObs.unsubscribe();
    }
    if(this.dropObs){
      this.dropObs.unsubscribe();
    }

    this.dragulaService.destroy('groups_bag');
  }

  userChanged(ev){
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

}
