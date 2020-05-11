import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';
import { UserService } from 'src/app/services/firebase.user/user.service';
import { User } from 'src/app/models/core/user/user';

@Component({
  selector: 'adm-users',
  templateUrl: './adm.users.component.html',
  styleUrls: ['./adm.users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Adm_UsersComponent implements OnInit, OnDestroy {

  title: string = 'Admin-Users';
  
  private dropObs: any;
  private allRolesObs: any;

  selectedUser: User;
  selectedRoles = [];
  allRoles = [];


  constructor(
    public router: Router,
    private ref: ChangeDetectorRef,
    private dragulaService: DragulaService,
    public authService: AuthService,
    public userService: UserService,
  ) {}

  ngOnDestroy(): void {
    if(this.allRolesObs){
      this.allRolesObs.unsubscribe();
    }
    if(this.dropObs){
      this.dropObs.unsubscribe();
    }

    this.dragulaService.destroy('user_bag');
  }

  ngOnInit(): void {
    this.dropObs = this.dragulaService.dropModel('user_bag')
      .subscribe(({ el, target, source, item, sourceModel, targetModel, sourceIndex, targetIndex }) => {
        if(el.classList.contains("empty_item")){
          return false;
        }
        this.ref.markForCheck();
        if(target.id === 'selectedRoles'){
          this.selectedUser.roles = targetModel
        }
        if(source.id === 'selectedRoles'){
          this.selectedUser.roles = sourceModel
        }
        this.userService.setUser(this.selectedUser);
      });
 
      this.dragulaService.createGroup('user_bag', {
        moves: (el, container, handle, sibling) => {
          if(el.classList.contains("empty_item")){
            return false;
          }
          return true;
        }
      });
  }

  userChanged(ev){
    this.selectedRoles = this.selectedUser.roles;
    if(!this.selectedRoles){
      this.selectedRoles = [];
    }
    if(this.allRolesObs){
      this.allRolesObs.unsubscribe();
    }
    this.allRolesObs = this.authService.adm_allAuthRoles$.subscribe(allRoles => {
      this.allRoles = allRoles;
      this.allRoles = allRoles.filter(x => !this.selectedRoles.includes(x));
      this.ref.markForCheck();
    });
  }

  blacklistChanged(ev){
    if(ev.detail.checked === true){
      this.authService.addUserToBlacklist(this.selectedUser);
    }
    if(ev.detail.checked === false){
      this.authService.removeUserToBlacklist(this.selectedUser);
    }
  }

}
