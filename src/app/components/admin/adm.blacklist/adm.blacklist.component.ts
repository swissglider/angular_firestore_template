import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';
import { UserService } from 'src/app/services/firebase.user/user.service';
import { User } from 'src/app/models/core/user/user';
import { TransferModel } from '../adm.main/transfer.model';

@Component({
  selector: 'adm-blacklist',
  templateUrl: './adm.blacklist.component.html',
  styleUrls: ['./adm.blacklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Adm_BlacklistComponent implements OnInit, OnDestroy {

  title: string = 'Admin-Blacklist';
  @Input() transferModel: TransferModel = null;
  @Output() titleEvent = new EventEmitter<string>();

  private dropBlacklistesUsersObs: any;
  private blacklistesUsersObs: any;
  private userObs: any;

  notBlacklistedUsers: User[];
  blacklistedUsers: User[];

  constructor(
    public router: Router,
    private ref: ChangeDetectorRef,
    private dragulaService: DragulaService,
    public authService: AuthService,
    public userService: UserService,
  ) { }

  ngOnDestroy(): void {
    if (this.dropBlacklistesUsersObs) {
      this.dropBlacklistesUsersObs.unsubscribe();
    }
    if (this.userObs) {
      this.userObs.unsubscribe();
    }
    if (this.blacklistesUsersObs) {
      this.blacklistesUsersObs.unsubscribe();
    }

    this.dragulaService.destroy('blacklisted_bag');
  }

  ngOnInit(): void {
    this.titleEvent.emit(this.title);
    if (this.transferModel && 'id' in this.transferModel) {}
    if (this.userObs) {
      this.userObs.unsubscribe();
    }
    this.userObs = this.authService.adm_allUsers$.subscribe((allUsers: User[]) => {
      if (this.blacklistesUsersObs) {
        this.blacklistesUsersObs.unsubscribe();
      }
      this.blacklistesUsersObs = this.authService.adm_Blacklist$.subscribe((balcklisted: any[]) => {
        this.blacklistedUsers = allUsers.filter(x => balcklisted.includes(x.id));
        this.notBlacklistedUsers = allUsers.filter(x => !balcklisted.includes(x.id));
        console.log(this.blacklistedUsers)
        console.log(this.notBlacklistedUsers)
        this.ref.markForCheck();
      });
    });

    if (this.dropBlacklistesUsersObs) {
      this.dropBlacklistesUsersObs.unsubscribe();
    }
    this.dropBlacklistesUsersObs = this.dragulaService.dropModel('blacklisted_bag')
      .subscribe(({ el, target, source, item, sourceModel, targetModel, sourceIndex, targetIndex }) => {
        if (el.classList.contains("empty_item")) {
          return false;
        }
        if (target.id === 'blacklistedUsers') {
          this.authService.addUserToBlacklist(item);
        }
        if (source.id === 'blacklistedUsers') {
          this.authService.removeUserToBlacklist(item);
        }
      });

    this.dragulaService.createGroup('blacklisted_bag', {
      moves: (el, container, handle, sibling) => {
        if (el.classList.contains("empty_item")) {
          return false;
        }
        return true;
      }
    });
  }

}
